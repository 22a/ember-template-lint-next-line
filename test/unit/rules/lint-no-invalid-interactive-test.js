'use strict';

const generateRuleTests = require('../../helpers/rule-test-harness');

generateRuleTests({
  name: 'no-invalid-interactive',

  config: true,

  good: [
    '<button {{action "foo"}}></button>',
    '<div role="button" {{action "foo"}}></div>',
    '<div randomProperty={{myValue}}></div>',
    '<li><button {{action "foo"}}></button></li>',
    '<form {{action "foo" on="submit"}}></form>',
    '<form onsubmit={{action "foo"}}></form>',
    '<form {{action "foo" on="reset"}}></form>',
    '<form onreset={{action "foo"}}></form>',
    '<img onerror={{action "foo"}}>',
    '<InputSearch @onInput={{action "foo"}} />',
    '<InputSearch @onInput={{action "foo"}}></InputSearch>',
    '{{#with (hash bar=(component "foo")) as |foo|}}<foo.bar @onInput={{action "foo"}}></foo.bar>{{/with}}',
    {
      config: { additionalInteractiveTags: ['div'] },
      template: '<div {{action "foo"}}></div>',
    },
    {
      config: { additionalInteractiveTags: ['div'] },
      template: '<div onclick={{action "foo"}}></div>',
    },
    {
      config: { additionalInteractiveTags: ['img'] },
      template: '<img onerror={{action "foo"}}>',
    },
  ],

  bad: [
    {
      template: '<div {{action "foo"}}></div>',

      result: {
        message: 'Interaction added to non-interactive element',
        line: 1,
        column: 5,
        source: '<div {{action "foo"}}></div>',
      },
    },

    {
      template: '<div onclick={{action "foo"}}></div>',

      result: {
        message: 'Interaction added to non-interactive element',
        line: 1,
        column: 5,
        source: '<div onclick={{action "foo"}}></div>',
      },
    },

    {
      // This example is detected solely based on the DOM event attribute name.
      template: '<div onclick={{pipe-action "foo"}}></div>',

      result: {
        message: 'Interaction added to non-interactive element',
        line: 1,
        column: 5,
        source: '<div onclick={{pipe-action "foo"}}></div>',
      },
    },

    {
      template: '<div onsubmit={{action "foo"}}></div>',

      result: {
        message: 'Interaction added to non-interactive element',
        line: 1,
        column: 5,
        source: '<div onsubmit={{action "foo"}}></div>',
      },
    },

    {
      // Any usage of the `action` helper will be caught, regardless of the attribute name.
      template: '<div randomAttribute={{action "foo"}}></div>',

      result: {
        message: 'Interaction added to non-interactive element',
        line: 1,
        column: 5,
        source: '<div randomAttribute={{action "foo"}}></div>',
      },
    },

    {
      template: '<form {{action "foo" on="click"}}></form>',

      result: {
        message: 'Interaction added to non-interactive element',
        line: 1,
        column: 6,
        source: '<form {{action "foo" on="click"}}></form>',
      },
    },

    {
      template: '<div {{action "foo" on="submit"}}></div>',

      result: {
        message: 'Interaction added to non-interactive element',
        line: 1,
        column: 5,
        source: '<div {{action "foo" on="submit"}}></div>',
      },
    },
  ],
});
