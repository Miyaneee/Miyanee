import { MenuItemConstructorOptions } from 'electron'

let menuTemplate = [
  {
    label: 'Miyanee',
    submenu: [
      { role: 'about', label: '关于' },
      { role: 'quit', label: '退出' }
    ]
  },
  {
    label: '编辑',
    submenu: [
      { role: 'selectAll', label: '全选' },
      { role: 'undo', label: '撤销' },
      { role: 'redo', label: '还原' },
      { type: 'separator' },
      { role: 'cut', label: '剪切' },
      { role: 'copy', label: '复制' },
      { role: 'paste', label: '粘贴' }
    ]
  }
] as MenuItemConstructorOptions[]

if (import.meta.env.DEV) {
  menuTemplate = menuTemplate.concat([
    {
      label: '调试',
      submenu: [
        { role: 'reload', label: '刷新' },
        { role: 'forcereload', label: '强制刷新' },
        { type: 'separator' },
        { role: 'toggledevtools', label: '开发者工具' }
      ]
    }
  ] as MenuItemConstructorOptions[])
}

export default menuTemplate
