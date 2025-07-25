import AceEditor from "react-ace";
import { useCodeEditor } from "../hooks/useCodeEditor";
import "ace-builds/src-noconflict/ext-language_tools";

// THEMES
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-one_dark";

// LANGUAGES (MODES)
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-tsx";
import "ace-builds/src-noconflict/mode-jsx";

import "ace-builds/src-noconflict/ext-language_tools";

export const SnippetEditor = ({
  code,
  language,
  className,
  change,
}: {
  code: string;
  language: string;
  className?: string;
  change: (newCode: string) => void;
}) => {
  const { getLanguage, preferences } = useCodeEditor();

  const selectedLanguage = getLanguage(language.toLowerCase());
  return (
    <div className={className}>
      <AceEditor
        theme={preferences.theme}
        mode={selectedLanguage}
        name="ace_editor"
        setOptions={{ useWorker: false, ...preferences }}
        value={code}
        style={{ width: "100%", height: "100%" }}
        className="rounded-sm"
        onChange={(newcode) => change(newcode)}
      />
    </div>
  );
};
