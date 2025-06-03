# Security Policy

> [!WARNING]
> Do not disclose any security-related issues, especially not on the issue tracker! Use [this form](https://github.com/leonsdepot/FineFind/security/advisories/new) instead!

## Supported Versions

**Only the latest released stable version** receives security-related patches.

## Reporting Security Issues

If you discover a vulnerability in FineFind—for example, behavior that could be exploited to run arbitrary scripts, bypass user consent, or access sensitive data—please report it immediately through [this private advisory channel](https://github.com/leonsdepot/FineFind/security/advisories/new)!

> [!WARNING]
> Do not share details of the issue publicly or with anyone else until a fix has been released. Early disclosure may put users at risk by allowing attackers to exploit the issue before we have a chance to resolve it.

Keeping the report private allows sufficient time for investigation and the development of a patch. Once the fix is publicly available, you’re welcome to share details of the issue responsibly.

> [!NOTE]  
> If a security concern has been accidentally disclosed publicly (e.g., as a regular issue on GitHub), please report it immediately using the link above so that it can be addressed appropriately and further exposure can be minimized.

## What Happens After a Report Has Been Sent?

Once a security issue is reported via the GitHub private security form, the matter will receive immediate priority. A response will be provided as soon as possible—either as confirmation of receipt or to request further details.

A notification will be sent once a patched version of FineFind becomes available, ensuring clarity that the issue has been resolved.

Please ensure regular access to the email address associated with your GitHub account, as follow-up communication may be necessary to complete the investigation or verify the fix.

If a solution has already been developed and tested, do not submit a public pull request (PR). Instead, attach a patch file using the private advisory channel. This allows for safe verification of the fix in the release context. Once confirmed that the patch is effective and introduces no regressions, a green light will be given to submit a pull request containing exactly the same code from the patch file. This PR will be merged immediately after submission, followed by the creation of a new release including the fix.

This workflow is necessary because pull requests are publicly visible and must therefore be treated as public disclosures. Minimizing the time between disclosure and patch release is critical for protecting users.
