/**
 * @Author: Caven
 * @Date: 2021-07-14 20:25:41
 */

import DrawTool from './DrawTool'
import EditTool from './EditTool'

export default function createTools() {
  return {
    drawTool: new DrawTool(),
    editTool: new EditTool()
  }
}
