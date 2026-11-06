import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { projectFilterLabels, projectFilters } from '../../src/config/projectFilters.js';
import { integrations, journey, proof, projects, skills } from '../../src/data/portfolio.js';

const allowedFilters = new Set(projectFilters.map(([value]) => value).filter((value) => value !== 'all'));

describe('portfolio configuration and content', () => {
  it('defines unique filters with labels and an all-systems option', () => {
    assert.ok(projectFilters.length > 1);
    assert.deepEqual(projectFilters[0], ['all', 'All systems']);
    assert.equal(new Set(projectFilters.map(([value]) => value)).size, projectFilters.length);
    for (const [value, label] of projectFilters) {
      assert.ok(value.trim());
      assert.ok(label.trim());
      assert.equal(projectFilterLabels.get(value), label);
    }
  });

  it('provides projects with unique valid slugs, descriptions, and known filters', () => {
    assert.ok(projects.length > 0);
    const slugs = projects.map(({ slug }) => slug);
    assert.equal(new Set(slugs).size, slugs.length);
    for (const project of projects) {
      for (const field of ['slug', 'category', 'title', 'text']) {
        assert.equal(typeof project[field], 'string', `${field} must be a string`);
        assert.ok(project[field].trim(), `${field} must not be empty`);
      }
      assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.ok(Array.isArray(project.filters) && project.filters.length > 0);
      assert.equal(new Set(project.filters).size, project.filters.length);
      for (const filter of project.filters) assert.ok(allowedFilters.has(filter), `unknown filter: ${filter}`);
    }
  });

  it('provides complete skills and non-negative proof metrics', () => {
    assert.ok(skills.length > 0);
    for (const skill of skills) {
      for (const field of ['icon', 'title', 'description']) {
        assert.equal(typeof skill[field], 'string');
        assert.ok(skill[field].trim());
      }
    }
    assert.ok(proof.length > 0);
    for (const metric of proof) {
      assert.ok(Number.isFinite(metric.value) && metric.value >= 0);
      for (const field of ['suffix', 'label', 'description']) {
        assert.equal(typeof metric[field], 'string');
        if (field !== 'suffix') assert.ok(metric[field].trim());
      }
    }
  });

  it('exports non-empty journey and integration content', () => {
    assert.ok(Array.isArray(journey) && journey.length > 0);
    assert.ok(Array.isArray(integrations) && integrations.length > 0);
  });
});
