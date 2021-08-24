/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	config.uiColor = '#F5F5F5';
	config.filebrowserImageUploadUrl = "/common/ckeditor_file";
	config.resize_enabled = true;
	config.enterMode = CKEDITOR.ENTER_BR;
	config.height = '400px';
	config.language = "ko";

	//모바일일경우 사진첨부 삭제
	if (checkMobileDevice() == true)
	{
		// The toolbar groups arrangement, optimized for two toolbar rows.
		config.toolbarGroups = [
			{ name: 'styles' },
			{ name: 'colors' },
			{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
			{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
			{ name: 'links' },
			{ name: 'tools' },
			{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
			{ name: 'others' },
			{ name: 'paragraph',   groups: [ 'list' ] }
		];
	//PC일경우 
	} else {
		// The toolbar groups arrangement, optimized for two toolbar rows.
		config.toolbarGroups = [
			{ name: 'styles' },
			{ name: 'colors' },
			{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
			{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
			{ name: 'links' },
			{ name: 'insert' },
			{ name: 'forms' },
			{ name: 'tools' },
			{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
			{ name: 'others' },
			{ name: 'paragraph',   groups: [ 'list' ] }
		];	
		
	}


	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
};

CKEDITOR.config.allowedContent = true;
