import React, { useRef } from 'react';
import MUIRichTextEditor from 'mui-rte';
import FieldValueList from '../../designSystemExtension/FieldValueList';
import { useTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { convertToRaw, convertFromHTML, ContentState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import handleEvent from '../../helpers/event-utils';

export default function RichText(props) {
  console.log('RichText props', props);
  const {
    getPConnect,
    label,
    // required,
    // disabled,
    value = '',
    // validatemessage,
    // status,
    onChange,
    onBlur,
    readOnly,
    // testId,
    // helperText,
    displayMode,
    hideLabel
  } = props;
  const textEditorRef = useRef<any>({});
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn.getStateProps().value;

  const defaultTheme = useTheme();
  Object.assign(defaultTheme, {
    overrides: {
      MUIRichTextEditor: {
        toolbar: {
          borderBottom: '1px solid lightgray'
        },
        placeHolder: {
          padding: '4px'
        },
        container: {
          minHeight: '13rem',
          border: '1px solid lightgray',
          borderRadius: '4px'
        },
        editor: {
          padding: '0px 4px'
        }
      }
    }
  });

  if (displayMode === 'LABELS_LEFT') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} />;
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} variant='stacked' />;
  }

  const contentHTML = convertFromHTML(value);
  const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap);
  const content = JSON.stringify(convertToRaw(state));
  console.log('content', content);

  if (readOnly) {
    return (
      <MUIRichTextEditor defaultValue={content} inlineToolbar={false} toolbar={false} readOnly />
    );
  }

  const handleSave = data => {
    console.log('data', data);
    const cont = convertFromRaw(JSON.parse(data));
    const editorValue = stateToHTML(cont);
    handleEvent(actions, 'changeNblur', propName, editorValue);
  };

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <MUIRichTextEditor
        label='Type something here...'
        defaultValue={content}
        onSave={handleSave}
        ref={textEditorRef}
        onBlur={() => {
          textEditorRef.current?.save();
        }}
        inlineToolbar
      />
    </MuiThemeProvider>
  );
}
