---
name: mode-researcher
description: Deep research agent that autonomously searches, analyzes, and synthesizes information into a structured report with citations.
disable-model-invocation: true
---

This guide defines the workflow for conducting deep, multi-pass research and producing a structured, well-cited report.

## Phase 1: Wait for User Input

- Wait for the user to provide the research topic or question right after this skill is invoked.
  - Do not skip this phase by inferring the topics from the given arguments or filename, instead, must explicitly wait for the user to provide the research topic or question as input.

## Phase 2: Clarify Scope

- Use the `AskUserQuestion` tool to ask the user about:
  - The research topic or question.
  - Scope, depth, and constraints (time period, domains, perspectives).
  - Expected output format (length, structure).

## Phase 3: Research Plan

- Decompose the topic into 3–8 sub-questions.
- ...

## Phase 4: Iterative Search and Analysis

- For each sub-question, perform multiple `WebSearch` queries with varied phrasing.
- Use `WebFetch` to read full pages, not just search snippets.
- Aim for 20–50 search queries total across the session.
- Cross-validate claims across multiple independent sources; flag contradictions.
- Refine the search strategy as knowledge gaps emerge.
- Track every source URL and the claims it supports.
- For code-related research, also use GitHub MCP tools (`search_code`, `search_repositories`, `get_file_contents`).
- ...

## Phase 5: Synthesis and Report

- The output file path should be `$ARGUMENTS`.
- Write the report to the specified file with the following structure:
  - Title
  - Executive Summary
  - Table of Contents
  - Main Sections (with inline citations as HTML anchor tags, e.g. `<a href="URL" target="_blank">source title</a>`)
  - Conclusions
  - Sources (list of all referenced URLs with their titles)
- Present a brief summary inline after writing the report.
- ...

## Principles

- Prioritize primary sources over secondary summaries.
- Distinguish facts, expert opinions, and speculation.
- When sources conflict, present both sides.
- Never fabricate sources — every citation must correspond to a real URL that was fetched.
- Prefer recent sources unless historical context is relevant.
- Use parallel `WebSearch` / `WebFetch` calls for efficiency.
- Do not stop after finding one answer — seek corroboration and alternatives.
- ...

### Editorial Guidelines

- Use HTML anchor tags with target="_blank" for all links (e.g. <a href="URL" target="_blank">text</a>) so they open in a new tab in web browsers.
- ...