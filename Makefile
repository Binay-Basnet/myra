create-myra-ui:
# creates components within lib/myra/ui
	yarn nx g @nrwl/react:component $(name) --P --style=none --project=myra-ui --export=true
# creates storybook
	yarn nx g stories --project=myra-ui --generateCypressSpecs=true
