import React from 'react';
import {
  Container, connectToHarmowareVis, HarmoVisLayers, MovesLayer, MovesInput
} from 'harmoware-vis';

const MAPSTYLE = '../../json/std.json'

class App extends Container {
  render() {
    const { actions, clickedObject, inputFileName, viewport,
      routePaths, movesbase, movedData } = this.props;
    const { movesFileName } = inputFileName;
    const optionVisible = false;

    return (
      <div>
        <div className="harmovis_controller">
          <ul className="flex_list">
            <li className="flex_row">
              <div className="harmovis_input_button_column">
              <label htmlFor="MovesInput">
                Operation data<MovesInput actions={actions} id="MovesInput" />
              </label>
              <div>{movesFileName}</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="harmovis_area">
          <HarmoVisLayers
            viewport={viewport} actions={actions}
            mapboxApiAccessToken=''
            mapStyle={MAPSTYLE}
            layers={[
              new MovesLayer({ routePaths, movesbase, movedData,
                clickedObject, actions, optionVisible }),
            ]}
          />
        </div>
      </div>
    );
  }
}
export default connectToHarmowareVis(App);
