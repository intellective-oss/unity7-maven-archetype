/** 
    Very simple, almost empty tab with just one button and label. 
    Click the button - call custom API service, get the name, fill the label "Hello %user%"
*/
Ext.define('custom.tab.HelloWorldTab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hello-world-tab',
	
	pId: '',

    constructor: function(config) {
        this.pId = config.cfg.id + '-tab' + '-' + Ext.id();
        config = Ext.applyIf(config, {
        	tabId: config.cfg.id,
        	solution: VSpace.utils.extractSolutionId(config.cfg.id),
            cfg: config.cfg,
            title: config.cfg.title,
            layout: 'fit',
            id: this.pId,
            items: []
        });
        this.callParent(arguments);
    },

	initComponent: function() {
		var me = this;
        this.items = {
			xtype: 'form',
			
			frame: true,
			title: VSpace.utils.i18n.localize('custom.HelloWorldTitle', 'Hello World!'),
			bodyPadding: 10,
			scrollable:true,
			width: 640,
			height: 480,
		
			fieldDefaults: {
				labelAlign: 'right',
				labelWidth: 115,
				msgTarget: 'side'
			},

			viewModel: {
				data: {
					browser: Ext.browser.name
				}
			},

			items: {
				xtype: 'fieldset',
				title: VSpace.utils.i18n.localize('custom.UserBrowserInfoTitle', 'User browser info'),
				defaultType: 'textfield',
				anchor: '60%',
				defaults: {
					anchor: '85%'
				},
		
				items: [
					{ allowBlank:false, fieldLabel: 'Current browser', name: 'browser', bind: '{browser}' },
					{ allowBlank:true, fieldLabel: 'Response', name: 'response', emptyText: '...', bind: '{response}' }
				]
			},

			buttons: [{
				text: VSpace.utils.i18n.localize('custom.button.SampleLabel', 'Click me!'),
				handler: me.sayHello.bind(this)
			}]
	    };
		this.callParent();
	},
	
	sayHello: function() {
		var form = this.down('form');
		Ext.Ajax.request({
			url: 'custom-api/1.0/helloWorld',
			method: 'POST',
			params: {
				browser: form.getViewModel().get('browser')
			},
	
			success: function (response, opts) {
				form.getViewModel().set('response', response.responseText);
				Ext.Msg.alert('', Ext.decode(response.responseText).message);
			},
	
			failure: function (response, opts) {
				form.getViewModel().set('response', response.status);
				Ext.Msg.alert('Failure', 'Server-side failure with status code ' + response.status);
			}
		});
	}
}); // end of file
