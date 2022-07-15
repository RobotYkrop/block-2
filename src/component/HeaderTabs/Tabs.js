import { Tabs } from 'antd';
import PropTypes from 'prop-types';

const HeaderTabs = ({ changeTab }) => {
  const { TabPane } = Tabs;
  return (
    <Tabs defaultActiveKey="1" onChange={changeTab}>
      <TabPane tab="Search" key="1" />
      <TabPane tab="Rated" key="2" />
    </Tabs>
  );
};

export default HeaderTabs;

HeaderTabs.defaultProps = {
  changeTab: () => {},
};

HeaderTabs.propTypes = {
  changeTab: PropTypes.func,
};
