import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
function git(args){const r=spawnSync("git",args,{encoding:"utf8"});if(r.error)throw r.error;if(r.status!==0)throw new Error(`git ${args.join(" ")} failed: ${r.stderr.trim()}`);return r.stdout;}
function existsAt(ref,path){return spawnSync("git",["cat-file","-e",`${ref}:${path}`],{encoding:"utf8"}).status===0;}
function textAt(ref,path){return git(["show",`${ref}:${path}`]);}
function assert(ok,msg){if(!ok)throw new Error(msg);}
const manifest=JSON.parse(await readFile("docs/book-alignment-manifest.json","utf8"));
const refs=["checkpoint-01-no-harness","checkpoint-02-minimal","checkpoint-03-runtime-structured","checkpoint-04-information-disciplined","checkpoint-05-capabilities","checkpoint-06-verified-orchestrated","checkpoint-07-secure","demo-tck-123-expected-failure","demo-tck-123-corrected","checkpoint-08-professional"];
for(const ref of refs)git(["rev-parse","--verify",ref]);
for(const c of manifest.contracts){if(c.paths)for(const p of c.paths)assert(existsAt(c.checkpoint,p),`${c.id}: missing ${p}`);if(c.mustNotHavePaths)for(const p of c.mustNotHavePaths)assert(!existsAt(c.checkpoint,p),`${c.id}: premature ${p}`);if(c.path){assert(existsAt(c.checkpoint,c.path),`${c.id}: missing ${c.path}`);const t=textAt(c.checkpoint,c.path);for(const x of c.mustContain??[])assert(t.includes(x),`${c.id}: expected ${JSON.stringify(x)}`);for(const x of c.mustNotContain??[])assert(!t.includes(x),`${c.id}: forbidden ${JSON.stringify(x)}`);}}
const redTest=textAt("demo-tck-123-expected-failure","tests/pricing.test.ts");assert(redTest.includes("11_800"),"red expected 11_800 missing");
const redPricing=textAt("demo-tck-123-expected-failure","src/domain/pricing.ts");assert(redPricing.includes("Math.round(totalBeforeTax * 0.10)"),"red faulty basis missing");
const greenPricing=textAt("demo-tck-123-corrected","src/domain/pricing.ts");assert(greenPricing.includes("input.itemsSubtotalCents * 0.10"),"green corrected basis missing");
for(const p of ["PUBLISHING_MIGRATION.md","QA_REPO_ALIGNMENT.md","REPO_ALIGNMENT_PLAN.md","docs/book-alignment.md",".checkpoints.json"])assert(!existsAt("checkpoint-08-professional",p),`course tag polluted by ${p}`);
console.log("BOOK ALIGNMENT: PASS");
