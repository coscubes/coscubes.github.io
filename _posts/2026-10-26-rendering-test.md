---
layout: post
title: "Rendering test: maths, figures and code"
date: 2026-10-26 14:00:00 +0100
tags: [meta, latex]
math: true
description: "A reference post that exercises every formatting feature this site supports — equations, figures with captions, syntax highlighting, tables, footnotes and the four kinds of link."
---

{% comment %}
This post exists to check that every formatting feature renders, and to be a
copy-paste reference for the ones you'll forget. Keep it, move it to _drafts/
(nothing there is published), or delete the file — nothing depends on it.

Note the `math: true` in the front matter above. Without it KaTeX isn't loaded
and every equation on the page stays as raw source.
{% endcomment %}

Everything below is a working example of something the site can render. If you are
reading this on the published blog, it doubles as proof that the build pipeline
survived whatever I last changed.

<!--more-->

## Maths

Equations need `math: true` in the front matter — that's what loads KaTeX, and it loads
on no other page. Write both inline and display maths with `$$ ... $$`; kramdown works out
which you meant from context.

A clip is $$T$$ frames. Embed each one with a backbone $$\phi$$ to get
$$\phi(\mathbf{x}_t) \in \mathbb{R}^{d}$$. The cheapest way to collapse those into a
single clip-level vector is to average over time:

$$
\mathbf{z} = \frac{1}{T} \sum_{t=1}^{T} \phi(\mathbf{x}_t)
$$

which discards temporal order completely — any permutation of the frames gives an
identical $$\mathbf{z}$$. That is the entire problem with average pooling, in one line.

Attention pooling learns which frames matter instead of weighting them equally:

$$
\begin{aligned}
e_t      &= \mathbf{w}^{\top} \tanh \left( W \phi(\mathbf{x}_t) + \mathbf{b} \right) \\
\alpha_t &= \frac{\exp(e_t)}{\sum_{t'=1}^{T} \exp(e_{t'})} \\
\mathbf{z} &= \sum_{t=1}^{T} \alpha_t \, \phi(\mathbf{x}_t)
\end{aligned}
$$

Worth noticing: this is *still* permutation-invariant. Nothing in those three lines
depends on $$t$$ except through $$\phi(\mathbf{x}_t)$$, so shuffling the frames shuffles
the $$\alpha_t$$ along with them and $$\mathbf{z}$$ comes out unchanged.[^perm] Recovering
order needs either positional encodings or a model with genuinely sequential structure.

Classification on top is the usual softmax and cross-entropy:

$$
\mathcal{L} = - \sum_{c=1}^{C} y_c \log \hat{y}_c,
\qquad
\hat{y}_c = \frac{\exp(z_c)}{\sum_{k=1}^{C} \exp(z_k)}
$$

## Figures

Use a `<figure>` when the image needs a caption — it picks up a border, rounded corners
and centred caption text:

<figure>
  <img src="{{ '/images/mmm19.png' | relative_url }}" alt="Two-stream architecture combining RGB and depth features for activity recognition" loading="lazy">
  <figcaption>Architecture from <a href="{{ '/publications/' | relative_url }}">Das et al., MMM 2019</a>. Wide figures scale to the text column.</figcaption>
</figure>

A plain markdown image gets no frame, which suits diagrams that already have their own
whitespace:

![Spatio-temporal grid layout over a video volume]({{ '/images/icvgip18.png' | relative_url }})

Both scale down to the column width and never force horizontal scrolling.

## Code

Fenced blocks are highlighted by Rouge, with a palette that follows the active colour
scheme — toggle light/dark in the header and the syntax colours change with it.

```python
import torch
import torch.nn as nn


class AttentionPool(nn.Module):
    """Attention pooling over the time axis of a (B, T, D) tensor."""

    def __init__(self, dim: int, hidden: int = 128) -> None:
        super().__init__()
        self.score = nn.Sequential(
            nn.Linear(dim, hidden),
            nn.Tanh(),
            nn.Linear(hidden, 1, bias=False),
        )

    def forward(self, feats: torch.Tensor) -> torch.Tensor:
        # feats: (B, T, D) -> weights: (B, T, 1)
        weights = self.score(feats).softmax(dim=1)
        return (weights * feats).sum(dim=1)  # (B, D)
```

Shell, for the commands you'll actually retype:

```bash
bundle exec jekyll serve --livereload   # preview at localhost:4000
git add _posts/ && git commit -m "New post" && git push
```

And YAML, since that's where papers live:

```yaml
- title: "A paper"
  authors: "First Author, Kaustubh Sakhalkar"
  year: 2027
```

Inline `code` works mid-sentence, as do <kbd>⌘</kbd>+<kbd>K</kbd> style keys.

## Tables

| Pooling over time | Order-aware | Extra parameters | Cost |
|---|:---:|---|---|
| Average | no | none | $$O(T)$$ |
| Max | no | none | $$O(T)$$ |
| Attention | no[^perm] | $$O(d)$$ | $$O(T)$$ |
| Recurrent | yes | $$O(d^2)$$ | $$O(T)$$, sequential |
| Self-attention + positions | yes | $$O(d^2)$$ | $$O(T^2)$$ |

Columns align with `:---:`, and maths works inside cells.

## Links

Four ways to link, all rendering identically:

- Inline: [KaTeX](https://katex.org/) does the typesetting.
- Reference style: [kramdown][kramdown] turns the markdown into HTML.
- Bare autolink: <https://rouge.jneen.net/>
- Raw HTML, for when you need an attribute:
  <a href="https://jekyllrb.com/docs/liquid/" rel="noopener" target="_blank">Liquid docs</a>
  (opens in a new tab).

Internal links should go through Liquid so they survive a change of domain:
the [about page]({{ '/about/' | relative_url }}) and
[publications]({{ '/publications/' | relative_url }}).

[kramdown]: https://kramdown.gettalong.org/syntax.html

## Quotes and lists

> Negative results are badly under-published, and I find them more useful than the
> alternative when I'm the one debugging at 2am.
>
> — the [previous post]({{ '/blog/starting-a-blog/' | relative_url }})

Ordered, with nesting:

1. Read the paper's equations before its prose.
2. Re-derive the central claim.
   - If it falls out in three lines, the paper buried the lede.
   - If it doesn't, you've found the interesting part.
3. Only then read the experiments.

Task lists work too:

- [x] Verify equations render
- [x] Verify figures scale
- [ ] Write something that isn't about this website

Emphasis comes in **bold**, *italic*, ***both*** and ~~struck through~~.

---

That horizontal rule was a `---`. Footnotes follow.

[^perm]: Strictly: permutation-*equivariant* scores composed with a permutation-invariant
    sum. The weights follow their frames, so the weighted sum is unchanged. Add a
    positional encoding to $$\phi(\mathbf{x}_t)$$ and this stops being true, which is
    exactly why transformers bother with them.
