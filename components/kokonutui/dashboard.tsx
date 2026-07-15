/**
 * @file 仪表盘组件
 * @description 整合内容区域和布局组件的主仪表盘组件
 * @author YYC³
 * @version 1.0.0
 * @created 2025-09-15
 */

import Content from "./content"
import Layout from "./layout"

export default function Dashboard() {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}
