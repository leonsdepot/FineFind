# Security Policy

> [!WARNING]
> **Do not disclose any security-related issues publicly—especially not on the issue tracker!** Use [this private advisory form](https://github.com/leonsdepot/FineFind/security/advisories/new) instead.

## Supported Versions

Only the **latest stable release** receives security-related patches.

## Reporting Security Issues

If you discover a vulnerability in FineFind—such as behavior that could allow execution of arbitrary scripts, bypass user consent, or access sensitive data—please report it **immediately and privately** via [this secure advisory channel](https://github.com/leonsdepot/FineFind/security/advisories/new).

> [!WARNING]
> Do **not** share details of the issue publicly or with anyone else until a fix has been released. Premature disclosure may put users at risk by enabling attackers to exploit the issue before it is resolved.

Keeping reports private allows sufficient time for investigation and patch development. Once a fix is publicly available, you are welcome to share details responsibly.

> [!NOTE]  
> If a security concern has been accidentally disclosed (e.g., as a regular GitHub issue), please report it immediately using the link above so it can be addressed appropriately and further exposure can be minimized.

## What Happens After a Report Is Submitted?

Once a security issue is submitted via GitHub's private advisory form, it will be prioritized immediately. You will receive a confirmation or a request for more details as soon as possible.

You will be notified when a patched version of FineFind is available, confirming that the issue has been resolved.

Please ensure regular access to the email address associated with your GitHub account, as follow-up communication may be necessary to complete the investigation or verify the fix.

> [!NOTE]
> **If you have already developed and tested a solution**, do not submit a public pull request (PR). Instead, attach a patch file through the private advisory channel.
> This allows the fix to be reviewed and verified in a secure context. Once confirmed to be effective and regression-free, you will be invited to submit a PR using the exact same code. This PR will be merged immediately, and a new release will follow.

This workflow is necessary because pull requests are publicly visible and therefore constitute public disclosure. Minimizing the time between disclosure and patch release is critical for protecting users.
