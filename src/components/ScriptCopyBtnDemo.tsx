import ScriptCopyBtn from "../components/magicui/script-copy-btn";
interface prop{
    email: string
}
export function ScriptCopyBtnDemo({email}: prop) {
 
  return (
    <>
      <ScriptCopyBtn
        codeLanguage="shell"
        lightTheme="nord"
        darkTheme="vitesse-dark"
        command={email}
      />
    </>
  );
}
