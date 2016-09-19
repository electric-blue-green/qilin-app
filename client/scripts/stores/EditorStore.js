import BaseStore       from "./BaseStore";
import EditorConstants from "../constants/EditorConstants";

class EditorStore extends BaseStore {
    constructor() {
        super();

        this.path    = null;
        this.content = null;

        this.subscribe( action => {
            switch ( action.type ) {
                case EditorConstants.EDITOR_OPEN_FILE_SUCCESS:
                    this.path       = action.path;
                    this.content    = action.content;

                    this.emitChange();
                    break;
            }
        } );
    }
};

export default new EditorStore();