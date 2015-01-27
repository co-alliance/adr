; To install the Islandora modules in this makefile run it from the docroot:
; drush make --no-core sites/all/drush/islandora.make

; This setting will add all the Islandora modules to the
; sites/all/modules/islandora_contrib directory

defaults[projects][subdir] = islandora_contrib

; Core version
; ------------
; Each makefile should begin by declaring the core version of Drupal that all
; projects should be compatible with.

core = 7.x

; API version
; ------------
; Every makefile needs to declare it's Drush Make API version. This version of
; drush make uses API version `2`.

api = 2

; Clone Islandora modules from GitHub.

projects[islandora][type] = module
projects[islandora][download][type] = git
projects[islandora][download][url] = https://github.com/Islandora/islandora.git
projects[islandora][download][tag] = 7.x-1.4

projects[islandora_accordion_rotator_module][type] = module
projects[islandora_accordion_rotator_module][download][type] = git
projects[islandora_accordion_rotator_module][download][url] = https://github.com/jordandukart/islandora_accordion_rotator_module.git
; no release-specific version available
projects[islandora_accordion_rotator_module][download][revision] = 19847e6476e37bb276eb802f47465f65660f7a1e

projects[islandora_batch][type] = module
projects[islandora_batch][download][type] = git
projects[islandora_batch][download][url] = https://github.com/Islandora/islandora_batch.git
projects[islandora_batch][download][tag] = 7.x-1.4

projects[islandora_book_batch][type] = module
projects[islandora_book_batch][download][type] = git
projects[islandora_book_batch][download][url] = https://github.com/Islandora/islandora_book_batch.git
projects[islandora_book_batch][download][tag] = 7.x-1.4

projects[islandora_bookmark][type] = module
projects[islandora_bookmark][download][type] = git
projects[islandora_bookmark][download][url] = https://github.com/Islandora/islandora_bookmark.git
projects[islandora_bookmark][download][tag] = 7.x-1.4

projects[islandora_fits][type] = module
projects[islandora_fits][download][type] = git
projects[islandora_fits][download][url] = https://github.com/Islandora/islandora_fits.git
projects[islandora_fits][download][tag] = 7.x-1.4

projects[islandora_ga_reports][type] = module
projects[islandora_ga_reports][download][type] = git
projects[islandora_ga_reports][download][url] = https://github.com/discoverygarden/islandora_ga_reports.git
; no 7.x-1.4 release tagged
projects[islandora_ga_reports][download][revision] = eda42c62be1e1feccd065d89ca7823e5c00d5e96

projects[islandora_importer][type] = module
projects[islandora_importer][download][type] = git
projects[islandora_importer][download][url] = https://github.com/Islandora/islandora_importer.git
projects[islandora_importer][download][tag] = 7.x-1.4

projects[islandora_internet_archive_bookreader][type] = module
projects[islandora_internet_archive_bookreader][download][type] = git
projects[islandora_internet_archive_bookreader][download][url] = https://github.com/Islandora/islandora_internet_archive_bookreader.git
projects[islandora_internet_archive_bookreader][download][tag] = 7.x-1.4

; This tool from Islandora 7.x-1.2 allowed site admins to limit object access
; by IP range. It has been removed from the 7.x-1.4 release due to known issue
; conflicts with how other modules use hooks.
projects[islandora_ip_embargo][type] = module
projects[islandora_ip_embargo][download][type] = git
projects[islandora_ip_embargo][download][url] = https://github.com/Islandora/islandora_ip_embargo.git
; no 7.x-1.4 release tagged
projects[islandora_ip_embargo][download][revision] = 811cc79e405d283c34c0f59a8ef8b077bfc307c5

projects[islandora_jodconverter][type] = module
projects[islandora_jodconverter][download][type] = git
projects[islandora_jodconverter][download][url] = https://github.com/discoverygarden/islandora_jodconverter.git
; no release-specific version available
projects[islandora_jodconverter][download][revision] = 82b4c57e8565fcb4e1755a704e3d0f047a64746b

projects[islandora_jwplayer][type] = module
projects[islandora_jwplayer][download][type] = git
projects[islandora_jwplayer][download][url] = https://github.com/Islandora/islandora_jwplayer.git
projects[islandora_jwplayer][download][tag] = 7.x-1.4

;projects[islandora_mapping][type] = module
;projects[islandora_mapping][download][type] = git
;projects[islandora_mapping][download][url] = https://github.com/discoverygarden/islandora_mapping.git
; no release-specific version available
;projects[islandora_mapping][download][revision] = 647f2b498273b4e4f8fa36e01fb04e69faa8d39a

projects[islandora_marcxml][type] = module
projects[islandora_marcxml][download][type] = git
projects[islandora_marcxml][download][url] = https://github.com/Islandora/islandora_marcxml.git
projects[islandora_marcxml][download][tag] = 7.x-1.4

projects[islandora_oai][type] = module
projects[islandora_oai][download][type] = git
projects[islandora_oai][download][url] = https://github.com/Islandora/islandora_oai.git
projects[islandora_oai][download][tag] = 7.x-1.4

projects[islandora_ocr][type] = module
projects[islandora_ocr][download][type] = git
projects[islandora_ocr][download][url] = https://github.com/Islandora/islandora_ocr.git
projects[islandora_ocr][download][tag] = 7.x-1.4

projects[islandora_openseadragon][type] = module
projects[islandora_openseadragon][download][type] = git
projects[islandora_openseadragon][download][url] = https://github.com/Islandora/islandora_openseadragon.git
projects[islandora_openseadragon][download][tag] = 7.x-1.4

projects[islandora_paged_content][type] = module
projects[islandora_paged_content][download][type] = git
projects[islandora_paged_content][download][url] = https://github.com/Islandora/islandora_paged_content.git
projects[islandora_paged_content][download][tag] = 7.x-1.4

projects[islandora_plupload][type] = module
projects[islandora_plupload][download][type] = git
projects[islandora_plupload][download][url] = https://github.com/discoverygarden/islandora_plupload.git
; no release-specific version available
projects[islandora_plupload][download][revision] = c58e5299f3095fcf0896a7ee89734a6a8b40aa37

projects[islandora_simple_workflow][type] = module
projects[islandora_simple_workflow][download][type] = git
projects[islandora_simple_workflow][download][url] = https://github.com/Islandora/islandora_simple_workflow.git
projects[islandora_simple_workflow][download][tag] = 7.x-1.4

projects[islandora_solr_metadata][type] = module
projects[islandora_solr_metadata][download][type] = git
projects[islandora_solr_metadata][download][url] = https://github.com/Islandora/islandora_solr_metadata.git
projects[islandora_solr_metadata][download][tag] = 7.x-1.4

projects[islandora_solr_search][type] = module
projects[islandora_solr_search][download][type] = git
projects[islandora_solr_search][download][url] = https://github.com/Islandora/islandora_solr_search.git
projects[islandora_solr_search][download][tag] = 7.x-1.4

projects[islandora_solr_views][type] = module
projects[islandora_solr_views][download][type] = git
projects[islandora_solr_views][download][url] = https://github.com/Islandora/islandora_solr_views.git
projects[islandora_solr_views][download][tag] = 7.x-1.4

projects[islandora_solution_pack_audio][type] = module
projects[islandora_solution_pack_audio][download][type] = git
projects[islandora_solution_pack_audio][download][url] = https://github.com/Islandora/islandora_solution_pack_audio.git
projects[islandora_solution_pack_audio][download][tag] = 7.x-1.4

projects[islandora_solution_pack_book][type] = module
projects[islandora_solution_pack_book][download][type] = git
projects[islandora_solution_pack_book][download][url] = https://github.com/Islandora/islandora_solution_pack_book.git
projects[islandora_solution_pack_book][download][tag] = 7.x-1.4

projects[islandora_solution_pack_collection][type] = module
projects[islandora_solution_pack_collection][download][type] = git
projects[islandora_solution_pack_collection][download][url] = https://github.com/Islandora/islandora_solution_pack_collection.git
projects[islandora_solution_pack_collection][download][tag] = 7.x-1.4

projects[islandora_solution_pack_compound][type] = module
projects[islandora_solution_pack_compound][download][type] = git
projects[islandora_solution_pack_compound][download][url] = https://github.com/Islandora/islandora_solution_pack_compound.git
projects[islandora_solution_pack_compound][download][tag] = 7.x-1.4

projects[islandora_solution_pack_document][type] = module
projects[islandora_solution_pack_document][download][type] = git
projects[islandora_solution_pack_document][download][url] = https://github.com/discoverygarden/islandora_solution_pack_document.git
; no release-specific version available
projects[islandora_solution_pack_document][download][revision] = fae12e7d3431e62df0fa9cdb4deec86ba64d6a50

projects[islandora_solution_pack_image][type] = module
projects[islandora_solution_pack_image][download][type] = git
projects[islandora_solution_pack_image][download][url] = https://github.com/Islandora/islandora_solution_pack_image.git
projects[islandora_solution_pack_image][download][tag] = 7.x-1.4

projects[islandora_solution_pack_large_image][type] = module
projects[islandora_solution_pack_large_image][download][type] = git
projects[islandora_solution_pack_large_image][download][url] = https://github.com/Islandora/islandora_solution_pack_large_image.git
projects[islandora_solution_pack_large_image][download][tag] = 7.x-1.4

projects[islandora_solution_pack_newspaper][type] = module
projects[islandora_solution_pack_newspaper][download][type] = git
projects[islandora_solution_pack_newspaper][download][url] = https://github.com/Islandora/islandora_solution_pack_newspaper.git
projects[islandora_solution_pack_newspaper][download][tag] = 7.x-1.4

projects[islandora_solution_pack_pdf][type] = module
projects[islandora_solution_pack_pdf][download][type] = git
projects[islandora_solution_pack_pdf][download][url] = https://github.com/Islandora/islandora_solution_pack_pdf.git
projects[islandora_solution_pack_pdf][download][tag] = 7.x-1.4

projects[islandora_solution_pack_video][type] = module
projects[islandora_solution_pack_video][download][type] = git
projects[islandora_solution_pack_video][download][url] = https://github.com/Islandora/islandora_solution_pack_video.git
projects[islandora_solution_pack_video][download][tag] = 7.x-1.4

projects[islandora_solution_pack_web_archive][type] = module
projects[islandora_solution_pack_web_archive][download][type] = git
projects[islandora_solution_pack_web_archive][download][url] = https://github.com/Islandora/islandora_solution_pack_web_archive.git
projects[islandora_solution_pack_web_archive][download][tag] = 7.x-1.4

projects[islandora_bagit][type] = module
projects[islandora_bagit][download][type] = git
projects[islandora_bagit][download][url] = https://github.com/Islandora/islandora_bagit.git
projects[islandora_bagit][download][tag] = 7.x-1.4

projects[islandora_checksum][type] = module
projects[islandora_checksum][download][type] = git
projects[islandora_checksum][download][url] = https://github.com/Islandora/islandora_checksum.git
projects[islandora_checksum][download][tag] = 7.x-1.4

projects[islandora_checksum_checker][type] = module
projects[islandora_checksum_checker][download][type] = git
projects[islandora_checksum_checker][download][url] = https://github.com/Islandora/islandora_checksum_checker.git
projects[islandora_checksum_checker][download][tag] = 7.x-1.4

projects[islandora_xacml_editor][type] = module
projects[islandora_xacml_editor][download][type] = git
projects[islandora_xacml_editor][download][url] = https://github.com/Islandora/islandora_xacml_editor.git
projects[islandora_xacml_editor][download][tag] = 7.x-1.4

projects[islandora_xml_forms][type] = module
projects[islandora_xml_forms][download][type] = git
projects[islandora_xml_forms][download][url] = https://github.com/Islandora/islandora_xml_forms.git
projects[islandora_xml_forms][download][tag] = 7.x-1.4

projects[objective_forms][type] = module
projects[objective_forms][download][type] = git
projects[objective_forms][download][url] = https://github.com/Islandora/objective_forms.git
projects[objective_forms][download][tag] = 7.x-1.4

projects[php_lib][type] = module
projects[php_lib][download][type] = git
projects[php_lib][download][url] = https://github.com/Islandora/php_lib.git
projects[php_lib][download][tag] = 7.x-1.4

; Libraries
; ---------

; required by islandora_internet_archive_bookreader
libraries[bookreader][type] = library
libraries[bookreader][download][type] = git
libraries[bookreader][download][url] = https://github.com/Islandora/internet_archive_bookreader.git
; no release-specific version available
libraries[bookreader][download][revision] = fcc7467af931d3b79038ab4bbdb9b0157a4729a4
libraries[bookreader][directory_name] = bookreader

; required by islandora_jodconverter
libraries[jodconverter][type] = library
libraries[jodconverter][download][type] = file
libraries[jodconverter][download][url] = http://sourceforge.net/projects/jodconverter/files/JODConverter/2.2.2/jodconverter-2.2.2.zip/download
libraries[jodconverter][download][md5] = dc01b8607118b4f50ce2d3c7f15a9241
libraries[jodconverter][directory_name] = jodconverter

; required by islandora_jwplayer
; no direct download link available
; http://www.jwplayer.com/download/

; required by islandora_openseadragon
libraries[openseadragon][type] = library
libraries[openseadragon][download][type] = git
libraries[openseadragon][download][url] = https://github.com/openseadragon/openseadragon.git
libraries[openseadragon][download][tag] = v1.2.0
libraries[openseadragon][directory_name] = openseadragon

; required by islandora
libraries[tuque][type] = library
libraries[tuque][download][type] = git
libraries[tuque][download][url] = https://github.com/Islandora/tuque.git
libraries[tuque][download][tag] = 1.4
libraries[tuque][directory_name] = tuque
