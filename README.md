# React Query + Redux + Vite + TypeScript

## Kiến thức cốt lõi cần nắm

1. **React Query**

   - Quản lý dữ liệu bất đồng bộ (fetch, cache, update, invalidate)
   - Query, Mutation, Query Key, QueryClient
   - Tự động refetch, caching, stale time

2. **Redux**

   - Quản lý state toàn cục
   - Reducer, Action, Store, Middleware
   - Kết hợp với React thông qua hook (`useSelector`, `useDispatch`)

3. **Vite**

   - Công cụ build siêu nhanh cho React
   - Hỗ trợ Hot Module Replacement (HMR)
   - Cấu hình qua file `vite.config.ts`

4. **TypeScript**

   - Kiểu dữ liệu tĩnh, kiểm tra lỗi lúc biên dịch
   - Interface, Type, Generic
   - Tăng độ an toàn và dễ bảo trì code

5. **Cấu trúc dự án**

   - Tách component, modal, helper, config, assets rõ ràng
   - Tổ chức code dễ mở rộng và bảo trì

6. **Best Practices**
   - Tối ưu hóa hiệu năng (memoization, lazy loading)
   - Phân chia logic UI và business
   - Sử dụng custom hook, kiểm soát side effect

---

## Luồng React Query của từng component

### 1. Table Component (blogs, users)

- Sử dụng `useQuery` để fetch danh sách dữ liệu (blog/user)
- Truyền query key gồm filter, pagination, search
- Refetch khi filter, pagination thay đổi
- Hiển thị trạng thái loading, error, data

### 2. Modal Component (create, edit, delete)

- Sử dụng `useMutation` để tạo, sửa, xóa dữ liệu
- Sau khi mutation thành công, gọi `queryClient.invalidateQueries` để cập nhật lại danh sách
- Hiển thị trạng thái loading, error, success

### 3. Tabs/Content Component

- Sử dụng `useQuery` để fetch dữ liệu theo tab đang chọn
- Query key thay đổi theo tab
- Refetch khi chuyển tab

### 4. Pagination Component

- Kết hợp với Table, truyền page vào query key
- Refetch khi chuyển trang

### 5. Custom Hook

- Tạo các hook riêng cho logic query/mutation
- Tái sử dụng ở nhiều component
