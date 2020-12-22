import React from 'react';
import {
  Container, connectToHarmowareVis, HarmoVisLayers, MovesLayer, MovesInput
} from 'harmoware-vis';

const MAPSTYLE1 = '../../json/std.json'
const MAPSTYLE2 = '../../json/std_vertical.json'
const MAPSTYLE3 = '../../json/pale.json'
const MAPSTYLE4 = '../../json/blank.json'

const BUTTONSTYLE = ['demo_input_button_column0','demo_input_button_column1','demo_input_button_column0','demo_input_button_column1'];

class App extends Container {
  constructor(props) {
    super(props);
    this.state = {
      mapStyle: MAPSTYLE1,
      selectedIndex: 0
    };
  }

  getMapSelected(e) {
    this.setState({ mapStyle: e.target.value, selectedIndex: e.target.selectedIndex });
    let element = document.getElementsByTagName('body');
    if(element[0].className!==""){element[0].className="";}else{element[0].className="bodyclass"}
  }

  render() {
    const { actions, clickedObject, inputFileName, viewport,
      routePaths, movesbase, movedData } = this.props;
    const { movesFileName } = inputFileName;
    const optionVisible = false;
    const {mapStyle, selectedIndex} = this.state;

    return (
      <div>
        <div className="harmovis_controller">
          <ul className="flex_list list-group">
            <li className="flex_row">
              <div className={BUTTONSTYLE[selectedIndex]}>
              <label htmlFor="MovesInput">
                Operation data<MovesInput actions={actions} id="MovesInput"/>
              </label>
              <div>{movesFileName || 'Not selected'}</div>
              </div>
            </li>
            <li>
              <div className="form-select">
                <label htmlFor="MapSelect" className="form-select-label">Map Select</label>
                <select id="MapSelect" value={mapStyle} onChange={this.getMapSelected.bind(this)} >
                <option value={MAPSTYLE1}>Standard Map</option>
                <option value={MAPSTYLE2}>Standard Vertical Map</option>
                <option value={MAPSTYLE3}>Pale Color Map</option>
                <option value={MAPSTYLE4}>White Map</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
        <div className="harmovis_area">
          <HarmoVisLayers
            viewport={viewport} actions={actions}
            mapboxApiAccessToken=''
            mapboxAddLayerValue=''
            mapStyle={mapStyle}
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
