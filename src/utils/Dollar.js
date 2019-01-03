import React from 'react';
import { dollar } from '@/components/Charts';
/**
 * 减少使用 dangerouslySetInnerHTML
 */
export default class Dollar extends React.PureComponent {
  componentDidMount() {
    this.rendertoHtml();
  }

  componentDidUpdate() {
    this.rendertoHtml();
  }

  rendertoHtml = () => {
    const { children } = this.props;
    if (this.main) {
      this.main.innerHTML = dollar(children);
    }
  };

  render() {
    return (
      <span
        ref={ref => {
          this.main = ref;
        }}
      />
    );
  }
}
