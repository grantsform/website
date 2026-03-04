---
title: "Series"
draft: false
---

<div class="card mb-3">
  <div class="card-body">
    <h1>Series</h1>
    <p class="lead">Collections of related posts.</p>
  </div>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
  {{ range .Site.Sections["series"].Pages }}
  <div style="background: linear-gradient(180deg, #0d2137, #1a3a5c); color: #e0f0ff; padding: 1rem; border-radius: 8px; box-shadow: 0 8px 28px rgba(0, 0, 0, 0.4); border: 1px solid rgba(33, 150, 243, 0.3);">
    <h3>{{ .Title }}</h3>
    <p style="color: rgba(224, 240, 255, 0.7);">{{ .Description }}</p>
    {{ .Content }}
  </div>
  {{ end }}
</div>