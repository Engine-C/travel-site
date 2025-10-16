---
applyTo: '**/*.ts'
---

# TypeScript 编码规范

## 1. 基本原则

### 1.1 类型安全
- **始终启用严格模式**：在 `tsconfig.json` 中设置 `"strict": true`
- **避免使用 `any`**：除非绝对必要，使用 `unknown` 替代
- **明确定义类型**：为函数参数、返回值、变量提供明确的类型注解
- **使用类型守卫**：通过 `typeof`、`instanceof` 等进行类型收窄

```typescript
// ❌ 不好
function processData(data: any) {
  return data.value;
}

// ✅ 好
function processData(data: { value: string }): string {
  return data.value;
}
```

### 1.2 命名规范
- **类/接口/类型别名**：使用 PascalCase
- **变量/函数/方法**：使用 camelCase
- **常量**：使用 UPPER_SNAKE_CASE 或 camelCase
- **枚举**：使用 PascalCase，成员使用 PascalCase
- **私有属性/方法**：以 `_` 或 `#` 开头（推荐使用 `#`）

```typescript
// 类和接口
class UserService {}
interface UserData {}
type UserId = string;

// 变量和函数
const userName = 'John';
function getUserById(id: string) {}

// 常量
const MAX_RETRY_COUNT = 3;
const apiEndpoint = 'https://api.example.com';

// 枚举
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}

// 私有成员
class User {
  #privateField: string;
  private _legacyPrivate: string;
}
```

## 2. 类型定义

### 2.1 Interface vs Type
- **接口（Interface）**：用于定义对象结构，支持扩展和合并
- **类型别名（Type）**：用于联合类型、交叉类型、映射类型等复杂场景

```typescript
// Interface - 对象结构
interface User {
  id: string;
  name: string;
  email: string;
}

// 接口扩展
interface AdminUser extends User {
  permissions: string[];
}

// Type - 复杂类型
type Result<T> = { success: true; data: T } | { success: false; error: string };
type Nullable<T> = T | null | undefined;
type ReadonlyUser = Readonly<User>;
```

### 2.2 泛型使用
- 使用有意义的泛型参数名
- 为泛型添加约束
- 避免过度使用泛型

```typescript
// ✅ 好的泛型使用
interface Repository<TEntity extends { id: string }> {
  findById(id: string): Promise<TEntity | null>;
  save(entity: TEntity): Promise<void>;
}

// 常用泛型参数名
// T - Type（通用类型）
// K - Key（键）
// V - Value（值）
// E - Element（元素）
// R - Result（结果）
```

### 2.3 实用工具类型
充分利用 TypeScript 内置的工具类型：

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Partial - 所有属性变为可选
type PartialUser = Partial<User>;

// Required - 所有属性变为必需
type RequiredUser = Required<User>;

// Readonly - 所有属性变为只读
type ReadonlyUser = Readonly<User>;

// Pick - 选择部分属性
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - 排除部分属性
type UserWithoutEmail = Omit<User, 'email'>;

// Record - 创建键值对类型
type UserMap = Record<string, User>;

// ReturnType - 获取函数返回类型
function getUser(): User { /* ... */ }
type UserReturnType = ReturnType<typeof getUser>;
```

## 3. 函数和方法

### 3.1 函数签名
- 明确标注参数类型和返回类型
- 使用可选参数和默认参数
- 对于复杂参数，使用对象解构

```typescript
// ✅ 好的函数签名
function createUser(
  name: string,
  email: string,
  options?: { age?: number; role?: string }
): User {
  // 实现
}

// 使用对象参数
interface CreateUserParams {
  name: string;
  email: string;
  age?: number;
  role?: string;
}

function createUser(params: CreateUserParams): User {
  // 实现
}
```

### 3.2 异步函数
- 始终为 Promise 添加类型参数
- 使用 async/await 代替 Promise 链

```typescript
// ✅ 好
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// 错误处理
async function fetchUserSafe(id: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}
```

### 3.3 函数重载
为具有多种调用方式的函数提供重载签名：

```typescript
function formatDate(date: Date): string;
function formatDate(timestamp: number): string;
function formatDate(dateString: string): string;
function formatDate(value: Date | number | string): string {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString();
}
```

## 4. 类和面向对象

### 4.1 类定义
- 使用访问修饰符（public、private、protected）
- 优先使用 `readonly` 保护不可变属性
- 使用 `#` 定义真正的私有字段

```typescript
class User {
  readonly id: string;
  #password: string;
  private createdAt: Date;
  
  constructor(id: string, password: string) {
    this.id = id;
    this.#password = password;
    this.createdAt = new Date();
  }
  
  public verifyPassword(password: string): boolean {
    return this.#password === password;
  }
}
```

### 4.2 抽象类和接口
- 使用接口定义契约
- 使用抽象类提供基础实现

```typescript
interface Logger {
  log(message: string): void;
  error(message: string): void;
}

abstract class BaseService {
  protected abstract logger: Logger;
  
  protected logOperation(operation: string): void {
    this.logger.log(`Executing: ${operation}`);
  }
}

class UserService extends BaseService {
  protected logger: Logger;
  
  constructor(logger: Logger) {
    super();
    this.logger = logger;
  }
}
```

## 5. 枚举和常量

### 5.1 枚举
- 使用字符串枚举而非数字枚举
- 枚举名使用单数形式

```typescript
// ✅ 推荐：字符串枚举
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}

// ✅ 也可以使用 const 枚举（编译时内联）
const enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

// 或使用字面量类型联合
type UserRole = 'ADMIN' | 'USER' | 'GUEST';
```

### 5.2 常量对象
使用 `as const` 创建不可变的常量对象：

```typescript
const CONFIG = {
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000,
  MAX_RETRIES: 3
} as const;

type Config = typeof CONFIG;
```

## 6. 模块和导入

### 6.1 导入规范
- 使用具名导入而非默认导入（在可能的情况下）
- 按类型分组导入
- 使用绝对路径或路径别名

```typescript
// 第三方库
import { computed, ref } from 'vue';
import axios from 'axios';

// 类型导入
import type { User, UserRole } from '@/types';

// 项目内部模块
import { userService } from '@/services/user';
import { formatDate } from '@/utils/date';

// 样式
import './styles.css';
```

### 6.2 导出规范
- 优先使用具名导出
- 避免导出可变绑定

```typescript
// ✅ 好
export interface User {
  id: string;
  name: string;
}

export function createUser(name: string): User {
  return { id: generateId(), name };
}

export const DEFAULT_ROLE = 'USER';

// ❌ 避免
export default class User {} // 不推荐默认导出
```

## 7. 错误处理

### 7.1 自定义错误类型
```typescript
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}
```

### 7.2 类型安全的错误处理
```typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown error') 
    };
  }
}
```

## 8. Vue 3 + TypeScript 最佳实践

### 8.1 组件类型定义
```typescript
import { defineComponent, PropType } from 'vue';

interface User {
  id: string;
  name: string;
}

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    },
    onUpdate: {
      type: Function as PropType<(user: User) => void>,
      required: false
    }
  },
  
  emits: {
    update: (user: User) => true,
    delete: (id: string) => typeof id === 'string'
  },
  
  setup(props, { emit }) {
    const handleUpdate = () => {
      emit('update', props.user);
    };
    
    return { handleUpdate };
  }
});
```

### 8.2 Composition API
```typescript
import { ref, computed, onMounted } from 'vue';

interface User {
  id: string;
  name: string;
}

export function useUser(userId: string) {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);
  
  const displayName = computed(() => 
    user.value ? user.value.name : 'Unknown'
  );
  
  async function fetchUser() {
    loading.value = true;
    try {
      const response = await fetch(`/api/users/${userId}`);
      user.value = await response.json();
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Unknown error');
    } finally {
      loading.value = false;
    }
  }
  
  onMounted(() => {
    fetchUser();
  });
  
  return {
    user,
    loading,
    error,
    displayName,
    refetch: fetchUser
  };
}
```

## 9. 注释和文档

### 9.1 JSDoc 注释
为公共 API 添加 JSDoc 注释：

```typescript
/**
 * 创建新用户
 * @param name - 用户名称
 * @param email - 用户邮箱
 * @param options - 可选配置项
 * @returns 创建的用户对象
 * @throws {ValidationError} 当参数验证失败时抛出
 * @example
 * ```typescript
 * const user = await createUser('John', 'john@example.com', { age: 25 });
 * ```
 */
async function createUser(
  name: string,
  email: string,
  options?: CreateUserOptions
): Promise<User> {
  // 实现
}
```

### 9.2 类型注释
对于复杂类型，添加说明注释：

```typescript
/**
 * 用户信息接口
 */
interface User {
  /** 用户唯一标识符 */
  id: string;
  
  /** 用户显示名称 */
  name: string;
  
  /** 用户邮箱地址 */
  email: string;
  
  /** 
   * 用户角色
   * @default 'USER'
   */
  role?: UserRole;
}
```

## 10. 代码质量检查

### 10.1 ESLint 配置
确保项目使用 TypeScript ESLint 规则：

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/strict-boolean-expressions": "warn"
  }
}
```

### 10.2 编译器选项
推荐的 `tsconfig.json` 严格配置：

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 11. 性能优化

### 11.1 类型推断
- 尽可能依赖类型推断，减少冗余类型注解
- 仅在必要时显式声明类型

```typescript
// ✅ 让 TypeScript 推断
const count = 0; // 推断为 number
const user = { id: '1', name: 'John' }; // 推断为 { id: string; name: string }

// 仅在需要更精确类型时显式声明
const role: UserRole = 'ADMIN';
const data: User[] = [];
```

### 11.2 避免类型断言
- 尽量避免使用 `as` 类型断言
- 使用类型守卫代替

```typescript
// ❌ 避免
function processValue(value: unknown) {
  const str = value as string;
  return str.toUpperCase();
}

// ✅ 使用类型守卫
function processValue(value: unknown): string {
  if (typeof value !== 'string') {
    throw new TypeError('Expected string');
  }
  return value.toUpperCase();
}
```

## 12. 总结

遵循这些 TypeScript 编码规范能够：
- ✅ 提高代码的类型安全性和可维护性
- ✅ 减少运行时错误
- ✅ 提供更好的 IDE 支持和自动补全
- ✅ 便于团队协作和代码审查
- ✅ 提升开发效率和代码质量

始终记住：**类型是你的朋友，严格的类型检查能在编译时捕获大多数错误。**

