| 模型类型对应的前端viewmodel | cBillType 模板类型 | 类型说明 | 布局模式 |
| --- | --- | --- | --- |
| VoucherList | VoucherList | _单据列表_ |  |
| VoucherList | ArchiveList | _档案列表_ |  |
| VoucherList | TreeList | _树表_ |  |
| VoucherList | Report | _报表_ |  |
| VoucherList | ListVoucher |  |  |
| VoucherList | EditVoucherList | _单据列表行内编辑_ |  |
| TreeArchive | TreeArchive | _左树右卡_ |  |
| TreeVoucher（TreeArchive？） | TreeVoucher |  |  |
| Voucher | Archive | _卡片_ |  |
| Voucher | Voucher | _单据_ |  |
| Voucher | EditableVoucherList | _可编辑列表_ |  |
| Option | Option | 选项卡 |  |
| Compare | Compare | _对照 树卡表_ |  |
| BillMaker | BillMaker |  |  |
| FreeView | FreeView | 自由布局 | 自由布局模式 |



```javascript
cb.biz.common.option = option;
cb.biz.common.freeview = freeview;
cb.biz.common.editvoucherlist = editvoucherlist
cb.biz.common.billmaker = billmaker;
cb.biz.common.voucher = voucher
cb.biz.common.voucherlist = voucherlist

```