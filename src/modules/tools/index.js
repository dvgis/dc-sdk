/**
 * @Author : Caven Chen
 */

import DrawTool from './DrawTool'
import EditTool from './EditTool'

export default function createTools() {
  return {
    drawTool: new DrawTool(),
    editTool: new EditTool(),
  }
}
