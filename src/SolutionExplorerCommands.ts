import * as vscode from "vscode";
import { SolutionExplorerProvider } from "./SolutionExplorerProvider";
import { ICommand, RenameCommand, RefreshCommand, OpenFileCommand, DeleteCommand, CreateFolderCommand, CreateFileCommand } from "./commands";

export class SolutionExplorerCommands {
    private refreshCommand: ICommand;
    private openFileCommand: ICommand;
    private renameCommand: ICommand;
    private deleteCommand: ICommand;
    private createFolderCommand: ICommand;
    private createFileCommand: ICommand;

    constructor(private readonly provider: SolutionExplorerProvider) {
        this.refreshCommand = new RefreshCommand(provider);
        this.openFileCommand = new OpenFileCommand();
        this.renameCommand = new RenameCommand(provider);
        this.deleteCommand = new DeleteCommand(provider);
        this.createFolderCommand = new CreateFolderCommand(provider);
        this.createFileCommand = new CreateFileCommand(provider);
    }

    public register() {
        this.registerCommand('solutionExplorer.refresh', this.refreshCommand);
        this.registerCommand('solutionExplorer.openFile', this.openFileCommand);
        this.registerCommand('solutionExplorer.renameFile', this.renameCommand);
        this.registerCommand('solutionExplorer.renameFolder', this.renameCommand);
        this.registerCommand('solutionExplorer.deleteFile', this.deleteCommand);
        this.registerCommand('solutionExplorer.deleteFolder', this.deleteCommand);
        this.registerCommand('solutionExplorer.createFolder', this.createFolderCommand);
        this.registerCommand('solutionExplorer.createFile', this.createFileCommand);
    }

    private registerCommand(name: string, command: ICommand) {
        vscode.commands.registerCommand(name, item => { 
            command.Run(item)
        });
    }
}