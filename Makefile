create-myra-ui:
# creates components within lib/myra/ui
	yarn nx g @nrwl/react:component $(name) --P --style=none --project=shared-ui --export=true
# creates storybook
	yarn nx g stories --project=shared-ui --generateCypressSpecs=true --cypressProject=myra-ui-e2e
