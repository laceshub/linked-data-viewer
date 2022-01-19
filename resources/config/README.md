# Configurations 
## default

This is the default configuration for the Laces Linked Data Viewer.

It is configured to use Wikidata as its source through its public query endpoint. The hierarchy in the viewer is configured to display the taxonomy (i.e., the hierarchy of "subclass of" relations) that is located under the Wikidata concept called "collective entity" (wd:Q99527517). Upon opening a concept for viewing, the user is presented with an information pane on that specific concept.

See also:

* [Laces](https://laceshub.com/)
* [Wikidata querying](https://query.wikidata.org)
* [Wikidata endpoint](https://query.wikidata.org/sparql)

## otl-laces

This is the OTL Laces configuration for the Laces Linked Data Viewer.

This configuration is a template for displaying Object Type Libraries (or OTLs) that have been captured according to the corresponding Laces data vocabulary. The hierarchy in the viewer is configured to display the taxonomy (i.e., the hierarchy of "subclass of" relations). Upon opening a resource for viewing, the user is presented with an information pane on that specific resource. Please specify a location and/or access mechanism to the desired OTL in the `config.json` file before using this configuration.

See also:

* [Laces](https://laceshub.com/)
* [ISO 16354:2013](https://www.iso.org/obp/ui/#iso:std:iso:16354:ed-1:v1:en)

## otl-nta8035

This is the OTL NTA8035 configuration for the Laces Linked Data Viewer.

This configuration is a template for displaying Object Type Libraries (or OTLs) that have been captured according to the Dutch National Technical Agreement 8035 The hierarchy in the viewer is configured to display the taxonomy (i.e., the hierarchy of "subclass of" relations). Upon opening a resource for viewing, the user is presented with an information pane on that specific resource. Please specify a location and/or access mechanism to the desired OTL in the `config.json` file before using this configuration.

See also:

* [Laces](https://laceshub.com/)
* [NTA 8035](https://www.nen.nl/nta-8035-2020-nl-266070)
* [ISO 16354:2013](https://www.iso.org/obp/ui/#iso:std:iso:16354:ed-1:v1:en)

## spl-laces

This is the SPL Laces configuration for the Laces Linked Data Viewer.

This configuration is a template for displaying Specification Libraries (or SPLs) that have been captured according to the corresponding Laces data vocabulary. The hierarchy in the viewer is configured to display top concepts and the resources classified as these concepts. Upon opening a resource for viewing, the user is presented with an information pane on that specific resource. Please specify a location and/or access mechanism to the desired SPL in the `config.json` file before using this configuration.

See also:

* [Laces](https://laceshub.com/)