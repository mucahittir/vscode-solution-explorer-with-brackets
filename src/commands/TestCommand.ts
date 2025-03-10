import { ContextValues, TreeItem } from "@tree";
import { Action, DotNetTest } from "@actions";
import { SingleItemActionsCommand } from "@commands";

export class TestCommand extends SingleItemActionsCommand {
    constructor() {
        super('Test');
    }

    public shouldRun(item: TreeItem | undefined): boolean {
        return !!item && (item.contextValue === ContextValues.project + '-cps' || item.contextValue === ContextValues.solution + '-cps');
    }

    public async getActions(item: TreeItem | undefined): Promise<Action[]> {
        if (!item || !item.path) { return []; }

        return [ new DotNetTest(item.path) ];
    }
}
