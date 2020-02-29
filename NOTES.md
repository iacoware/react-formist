## How to publish on NPM

```bash
git add -A
git commit -m "Another great feature"
git push
npm run build
npm version patch|minor|major
npm run publish
```

## Local development

cd into `react-formist` and then `npm link`
cd into `react-formist/example` and then `npm link react-formist`
