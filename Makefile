create-myra-ui:
# creates components within lib/myra/ui
	yarn nx g @nrwl/react:component $(name) --P --style=none --project=shared-ui --export=true
# creates storybook
	yarn nx g @nrwl/react:stories --project=shared-ui --generateCypressSpecs=true --cypressProject=@myra-ui-e2e

create-myra-foundation:
# creates components within lib/myra/ui
	yarn nx g @nrwl/react:component $(name) --P --style=none --project=@myra-foundations --export=true
# creates storybook
	yarn nx g @nrwl/react:stories --project=@myra-foundations --generateCypressSpecs=true --cypressProject=@myra-ui-e2e

