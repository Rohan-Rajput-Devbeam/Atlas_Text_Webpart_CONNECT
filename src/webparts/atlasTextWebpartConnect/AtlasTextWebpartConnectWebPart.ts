import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AtlasTextWebpartConnectWebPart.module.scss';
import * as strings from 'AtlasTextWebpartConnectWebPartStrings';

import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';

import { PropertyFieldSpinButton } from '@pnp/spfx-property-controls/lib/PropertyFieldSpinButton';

import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';

import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';

export interface IAtlasTextWebpartConnectWebPartProps {
  description: string;
  title: string;
  color: string;
  spinValue: number;
  style: string;
  multiSelect: any;
  textUnderline: any;
  textBold: any;
  textItalic: any;
  toggleInfoHeaderValue: boolean;
  hyperlink:any;
}


export default class AtlasTextWebpartConnectWebPart extends BaseClientSideWebPart<IAtlasTextWebpartConnectWebPartProps> {

  public render(): void {
    if (this.properties.title == null || this.properties.title == "") {
      this.domElement.innerHTML = `
      <div>Edit Text</div>
      `;
    }

    else if (this.properties.toggleInfoHeaderValue) {
      this.domElement.innerHTML = `
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
  </head>
        <div class="${styles.atlasTextWebpartConnect}">
          <div class="${styles.container}">     
          <a href = "${escape(this.properties.hyperlink)}">
                <span style="color:${this.properties.color}; font-size:${this.properties.spinValue}px; font-weight:${this.properties.textBold}; font-style:${this.properties.style}; text-decoration:${this.properties.textUnderline};" class="${styles.title}">${escape(this.properties.title)}</span>
          </a>                    
          </div>
        </div>`;
    }

    else {
      this.domElement.innerHTML = `
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
</head>
      <div class="${styles.atlasTextWebpartConnect}">
        <div class="${styles.container}">

              <span style="color:${this.properties.color}; font-size:${this.properties.spinValue}px; font-weight:${this.properties.textBold}; font-style:${this.properties.style}; text-decoration:${this.properties.textUnderline};" class="${styles.title}">${escape(this.properties.title)}</span>
                    
        </div>
      </div>`;
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let hyperlinkOnOff: any = [];

    if (this.properties.toggleInfoHeaderValue) {
      hyperlinkOnOff = PropertyPaneTextField('hyperlink', {
        label: "Hyperlink",
        placeholder: "Enter hyperlink for the text!"
      });
    }
    else {

    }


    return {
      pages: [
        {
          header: {
            description: "This is a customized text-editor developed by Atlas..."
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [

                PropertyPaneTextField('title', {
                  label: "Text",
                  placeholder: "Enter your test here!"
                }),
                PropertyFieldToggleWithCallout('toggleInfoHeaderValue', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'toggleInfoHeaderFieldId',
                  label: 'Add hyperlink to text',
                  calloutContent: React.createElement('p', {}, 'With this control you can enable or disable the Hyperlink url section for the text.'),
                  onText: 'ON',
                  offText: 'OFF',
                  checked: this.properties.toggleInfoHeaderValue
                }),
                hyperlinkOnOff,
                PropertyFieldSpinButton('spinValue', {
                  label: 'Font-Size',
                  initialValue: this.properties.spinValue,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  suffix: 'px',
                  min: 12,
                  max: 100,
                  step: 0.25,
                  decimalPlaces: 2,
                  incrementIconName: 'CalculatorAddition',
                  decrementIconName: 'CalculatorSubtract',
                  key: 'spinButtonFieldId'
                }),
                // PropertyFieldMultiSelect('multiSelect', {
                //   key: 'multiSelect',
                //   label: "Font-Styles",
                //   options: [
                //     {
                //       key: "bold",
                //       text: "bold"
                //     },
                //     {
                //       key: "italic",
                //       text: "italic"
                //     },
                //     {
                //       key: "underline",
                //       text: "underline"
                //     }
                //   ],
                //   selectedKeys: this.properties.multiSelect
                // }),
                PropertyPaneDropdown('style', {
                  label: 'Font-Style',
                  options: [
                    { key: 'normal', text: 'Normal' },
                    { key: 'italic', text: 'Italic' },
                    { key: 'oblique', text: 'Oblique' }
                  ],
                  selectedKey: 'normal',
                }),
                PropertyPaneDropdown('textBold', {
                  label: 'Font-Weight',
                  options: [
                    { key: 'normal', text: 'Normal' },
                    { key: 'bold', text: 'Bold' },
                    { key: 'bolder', text: 'Bolder' },
                    { key: 'lighter', text: 'Lighter' }

                  ],
                  selectedKey: 'normal',
                }),
                PropertyPaneDropdown('textUnderline', {
                  label: 'Font-Decoration',
                  options: [
                    { key: 'normal', text: 'Normal' },
                    { key: 'underline', text: 'Underline' },
                    { key: 'line-through', text: 'Line-through' },
                    { key: 'overline', text: 'Overline' }

                  ],
                  selectedKey: 'normal',
                }),
                PropertyFieldColorPicker('color', {
                  label: 'Text-Color',
                  selectedColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  debounce: 500,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId',
                  valueAsObject: false
                })

              ]
            }
          ]
        }
      ]
    };
  }

}
