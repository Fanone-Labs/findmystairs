# Put this project on GitHub

The easiest method is GitHub Desktop:

1. Unzip `find-my-stairs-source.zip`.
2. Install and open [GitHub Desktop](https://desktop.github.com/).
3. Sign in to the GitHub account that will own the project.
4. Choose **File → Add Local Repository**.
5. Select the unzipped `find-my-stairs-source` folder.
6. Click **Publish repository**.
7. Keep **Private** checked at first so the code is not publicly visible.
8. Click **Publish Repository**.

The project is already set up as a Git repository, so GitHub Desktop should
recognize it immediately.

## Give another person access

On GitHub, open the repository and choose:

**Settings → Collaborators → Add people**

Invite them by their GitHub username or email. They will see only this code,
not your ChatGPT account or conversations.

## Test changes

From a terminal inside the project folder:

```bash
npm install
npm run dev
```

Changes in GitHub do not automatically update the existing ChatGPT-hosted
website. They can be reviewed and then brought back into the hosted site, or
the project can later be deployed through another hosting service.

## Deploy it with Vercel

1. Import the GitHub repository into Vercel.
2. Confirm that Vercel identifies the framework as **Next.js**.
3. Leave the Output Directory setting blank.
4. Use `npm run build` as the Build Command.
5. Click **Deploy**.
