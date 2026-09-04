import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

test('the complete intro dialogue, actions and choices remain exactly original', () => {
  const {Intro} = JSON.parse(readFileSync(new URL('../reference/assets/dialogs_en.json', import.meta.url), 'utf8'));
  // JSON.stringify(Intro) from original revision c3758c1653f2c6b46fb26c064ae28688129805f2.
  const digest = createHash('sha256').update(JSON.stringify(Intro)).digest('hex');
  assert.equal(digest, '296dba6b085d5f92fe2c9a75712269c5d924cc2ec6def92fd4fe2f4c49f9d6ba');
});
