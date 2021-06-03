const window = {
  createStatusBarItem: jest.fn(() => ({
    show: jest.fn(),
    tooltip: jest.fn(),
  })),
  showErrorMessage: jest.fn(),
  showWarningMessage: jest.fn(),
  createTextEditorDecorationType: jest.fn(),
  createOutputChannel: jest.fn(),
  showWorkspaceFolderPick: jest.fn(),
  onDidChangeActiveTextEditor: jest.fn(),
  showInformationMessage: jest.fn(),
  createTerminal: jest.fn(() => ({
    show: jest.fn(),
    sendText: jest.fn(),
  })),
};

export { window };
