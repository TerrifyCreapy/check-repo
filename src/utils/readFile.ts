export function onRead(file: File, onAction: (result: string) => unknown) {
    if(!file.name.endsWith(".json")) return null;

    const fileReader = new FileReader();

    function onLoadFileReader(event: any) {
        const data = event.target.result;
        onAction(data);
    }

    fileReader.onload = onLoadFileReader;

    fileReader.readAsText(file);

}