# GitLab CI/CD setup for Three Days Fit

This project keeps GitHub Actions and GitLab CI/CD side by side so the same
delivery concepts can be demonstrated on both platforms.

## Workflow mapping

| Capability | GitHub Actions | GitLab CI/CD |
| --- | --- | --- |
| Unit tests | `.github/workflows/tests.yml` / `unit` | `.gitlab-ci.yml` / `unit-tests` |
| Browser tests | `.github/workflows/tests.yml` / `e2e` | `.gitlab-ci.yml` / `e2e-tests` |
| Static site | `.github/workflows/deploy-pages.yml` | `.gitlab-ci.yml` / `deploy-pages` |
| Multi-platform image | `.github/workflows/docker-publish.yml` | `.gitlab-ci.yml` / `publish-container` |
| Dependency cache | `actions/setup-node` npm cache | GitLab cache of `.npm/` |
| Test evidence | GitHub artifact | GitLab job artifact |
| Registry login | Docker Hub secrets | Docker Hub credentials stored as GitLab variables |

## One-time GitLab project setup

### 1. Push the CI file

Commit `.gitlab-ci.yml` and push it to the GitLab project's default branch.
GitLab detects this filename automatically. Open **Build > Pipelines** to see
the resulting pipeline.

Before committing, GitLab's **Build > Pipeline editor > Validate** page can be
used to lint the YAML against the GitLab version running the project.

### 2. Check the default branch

Open **Settings > Repository > Branch defaults** and confirm that the default
branch is `main`, or change it to the branch used by the repository. The CI file
uses `$CI_DEFAULT_BRANCH`, so it does not hard-code the name.

### 3. Check runners

Open **Settings > CI/CD > Runners** and confirm that at least one runner is
available.

- GitLab.com hosted runners can run the Node.js jobs and Docker-in-Docker job.
- A self-managed Docker runner must be registered with privileged mode enabled
  for `docker:dind`, Buildx, QEMU, and the two-platform image build.

If the Node.js jobs run but `publish-container` reports a privileged-mode or
Docker daemon error, this is a runner configuration issue rather than an
application build issue.

### 4. Prepare Docker Hub access

The GitLab pipeline publishes to Docker Hub, not to the GitLab Container
Registry. Ensure the Docker Hub repository `122323/threedaysfit` exists.

In Docker Hub, open **Account settings > Personal access tokens** and create a
token with permission to push images. Copy it when Docker Hub shows it; the
token is not displayed again.

The GitLab Container Registry project feature is not required by this pipeline
and can be disabled under **Settings > General > Visibility, project features,
permissions** if it is not used for anything else.

### 5. Add the CI/CD variables

Open **Settings > CI/CD > Variables** and add:

| Key | Value for this demo | Notes |
| --- | --- | --- |
| `DOCKERHUB_USERNAME` | `122323` | Docker Hub account name |
| `DOCKERHUB_TOKEN` | Docker Hub personal access token | Masked and hidden; never commit it |
| `VITE_GOOGLE_CLIENT_ID` | The Google OAuth web client ID | Exposed in the browser bundle; it is configuration, not a password |
| `VITE_FIRESTORE_PROJECT_ID` | The Firebase project ID | Exposed in the browser bundle; it is configuration, not a password |

Set `DOCKERHUB_TOKEN` to **Masked and hidden**. Protect it if `main` and release
tags are protected. The pipeline never prints the token and passes it to
`docker login` through standard input.

The two `VITE_*` variables are used by both GitLab Pages and the Docker image
build. Do not place OAuth client secrets, service-account keys, or Firebase
private keys in them: Vite embeds these values into public JavaScript.

For a public teaching repository, keep the variables unprotected if merge
request builds ever need them. The current pipeline only consumes them in
default-branch and tag deployment jobs, so protected variables also work when
`main` and release tags are protected.

### 6. Configure GitLab Pages

No access token is required. After `deploy-pages` succeeds, open **Deploy >
Pages** and follow the generated URL.

The job derives `VITE_BASE_PATH` from `$CI_PAGES_URL`. This supports both forms
GitLab can assign:

- a project-specific unique domain served from `/`;
- a namespace domain served from `/<project>/`.

The job also copies `index.html` to `404.html`, which lets direct links to SPA
routes return the app instead of a static 404 page.

### 7. Allow the new site in Google/Firebase

If Google sign-in is part of the demonstration:

1. Copy the exact Pages URL from **Deploy > Pages**.
2. In the Google Cloud OAuth client, add its origin (scheme plus hostname, no
   route path) to **Authorized JavaScript origins**.
3. In Firebase Authentication, add the Pages hostname to **Authorized domains**.

Deployment can succeed without this step, but Google login on the deployed site
will be rejected until the new origin/domain is allowed.

## What each GitLab event demonstrates

### Merge request into the default branch

Runs `unit-tests` and `e2e-tests`. It does not publish Pages or a container. This
is the CI quality-gate example.

### Push or merge to the default branch

Runs both test jobs first. If they pass, GitLab deploys Pages and publishes two
container tags in parallel:

- `122323/threedaysfit:latest`
- `122323/threedaysfit:sha-<short-commit-sha>`

The immutable SHA tag provides traceability; `latest` provides convenience.

### Semantic version tag

Create and push a tag such as `v1.0.2`. The pipeline publishes:

- `122323/threedaysfit:1.0.2`
- `122323/threedaysfit:sha-<short-commit-sha>`

Both default-branch and release images are built for `linux/amd64` and
`linux/arm64`. The job finishes by inspecting the remote manifest so both target
platforms are visible in the job log.

### Manual pipeline

Use **Build > Pipelines > New pipeline**. A manual pipeline runs the tests. If
the selected branch is the default branch, it also runs both deployment jobs.

## Suggested classroom walkthrough

1. Open the GitHub Actions workflow and `.gitlab-ci.yml` side by side.
2. Compare `on` with `workflow: rules` and job `rules`.
3. Compare GitHub jobs/steps with GitLab stages/jobs/scripts.
4. Compare npm cache and Playwright artifacts.
5. Merge a small merge request and watch tests gate both deployments.
6. Open the Pages environment and the Docker Hub repository result.
7. Push a semantic version tag and compare mutable, version, and SHA image tags.
8. Inspect the Buildx manifest log and point out the amd64/arm64 entries.

## Existing GitHub workflow observation

The GitHub Docker workflow computes tags with `docker/metadata-action`, but its
Buildx step currently ignores that output and pushes only
`122323/threedaysfit:latest`. For a precise platform comparison, either present
that as an intentional review exercise or later connect
`${{ steps.meta.outputs.tags }}` to the `tags` input. The GitLab pipeline already
implements `latest`, semantic-version, and immutable SHA tags.
