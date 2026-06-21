1. Merge combines two branches by creating a new merge commit that joins their histories.
2. Merge preserves the exact history; both branch lines and the join point stay visible.
3. Rebase moves your commits to replay on top of another branch's latest commit.
4. Rebase rewrites commit hashes, producing a linear history with no merge commit.
5. Use merge to integrate a shared/long-lived branch where true history matters.
6. Use merge for feature branches when you want an explicit record of the integration.
7. Use rebase to update your local branch with upstream changes before pushing.
8. Use rebase to clean up local commits into a tidy, linear series before review.
9. Never rebase commits already pushed and shared; it breaks others' history.
10. Rule of thumb: rebase private/local work, merge public/shared work.

tldr: Merge joins histories with a merge commit and preserves them; rebase replays commits for linear history but rewrites hashes. Rebase local/private work; merge shared/public work. Never rebase pushed commits others use.
