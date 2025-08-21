# Workflows & Test Cases

This framework is built on top of [Artillery](https://www.artillery.io/docs) for running API functional and performance tests.

## Workflows

All scenario-based test cases are defined inside the `workflows/` and `performance-tests` folder.

Each YAML file in `workflows/` corresponds to a **test workflow**:
- It describes one or more **scenarios** that simulate a real API usage path.
- Artillery runs the defined HTTP requests in order, with assertions and captured variables.

For example:
- `workflow-based.yml` – simulates fetching resources from the catalog domain and iterating over child resources.

## How to Run

From project root:

```bash
# Run any workflow YAML with Artillery
artillery run workflows/workflow-based.yml

# Or run a performance workflow
artillery run performance/basic_performance.yml
```

## Notes

- The workflows showcase how test cases can capture IDs, loop through datasets, and validate cross-domain mappings.
- Reports are generated under `reports/` and can be viewed as HTML.

---

_This document is meant as a quick guide to understand the `workflows/` folder structure and how to execute those test cases._
