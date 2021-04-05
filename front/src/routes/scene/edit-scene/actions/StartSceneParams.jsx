import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { Text } from 'preact-i18n';
import Select from 'react-select';

import { ACTIONS } from '../../../../../../server/utils/constants';

import actions from '../../../../actions/scene';

@connect('scenes', actions)
class StartSceneParams extends Component {
  handleChange = selectedOption => {
    if (selectedOption) {
      this.props.updateActionProperty(this.props.columnIndex, this.props.index, 'scene', selectedOption.value);
    } else {
      this.props.updateActionProperty(this.props.columnIndex, this.props.index, 'scene', null);
    }
  };

  refreshSelectedOptions = nextProps => {
    let selectedOption = null;
    let scenes = this.state.scenes || [];

    if (scenes.length === 0 && nextProps.scenes) {
      scenes = nextProps.scenes.map(scene => ({
        value: scene.selector,
        label: scene.name
      }))
    }

    if (nextProps.action.scene && scenes.length > 0) {
      selectedOption = scenes.find(scene => scene.value === nextProps.action.scene) || null;
    }

    this.setState({ selectedOption, scenes });
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
  }

  async componentDidMount() {
    await this.props.getScenes();
  }

  componentWillReceiveProps(nextProps) {
    this.refreshSelectedOptions(nextProps);
  }

  render(props, { selectedOption, scenes }) {
    return (
      <div class="form-group">
        <label class="form-label">
          {props.action.type === ACTIONS.LIGHT.TURN_ON && <Text id="editScene.actionsCard.turnOnLights.label" />}
          {props.action.type === ACTIONS.LIGHT.TURN_OFF && <Text id="editScene.actionsCard.turnOffLights.label" />}
        </label>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={scenes}
        />
      </div>
    );
  }
}

export default StartSceneParams;
