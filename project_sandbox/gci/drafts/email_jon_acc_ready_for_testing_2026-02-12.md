# Email Draft — Jon West (ACC Ready for Testing)

**Date:** 2026-02-12
**To:** Jon West, Shalon, Tom
**Subject:** RE: (same thread)

---

Jon,

Great news — the ACC connection is live. OAuth is working end to end, and the GPT is successfully making calls to Autodesk.

One thing we discovered during testing: my Autodesk account doesn't have access to GCI's ACC account, so I'm getting a permissions error when I try to pull projects. That's expected — it just means someone on your team needs to do the first real test.

Here's what to try:

1. Open the GCI Data Scout GPT
2. Ask: **"What projects are in ACC?"**
3. It'll prompt you to sign in with Autodesk — use your GCI account
4. Should return your project list

Once that works, try: **"Show me open issues on 25-1001 Proof School"**

I'm available tomorrow around 3:45 if that works for a quick check-in. If you get a chance to do that test beforehand, we can jump right into reviewing results.

Thanks,
Justin
