/**
 * 有潜在问题的排序算法实现
 * 这个文件包含多个常见的编程错误和潜在问题
 */

// 问题1: 没有正确处理边界情况
export function bubbleSort(arr: number[]): number[] {
  // 问题: 没有检查数组是否为空或null
  const result = arr;
  
  // 问题2: 直接修改原数组，没有创建副本
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - 1; j++) {
      if (result[j] > result[j + 1]) {
        // 问题3: 使用临时变量交换，但没有类型检查
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }
  
  return result;
}

// 问题4: 快速排序实现有栈溢出风险
export function quickSort(arr: any[]): any[] {
  // 问题5: 使用any类型，失去了类型安全
  if (arr.length <= 1) {
    return arr;
  }
  
  // 问题6: 总是选择第一个元素作为pivot，最坏情况O(n²)
  const pivot = arr[0];
  const left = [];
  const right = [];
  
  // 问题7: 从索引1开始，但没有明确说明原因
  for (let i = 1; i < arr.length; i++) {
    // 问题8: 没有处理相等的情况，可能导致不稳定排序
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  // 问题9: 递归调用没有尾调用优化，可能导致栈溢出
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 问题10: 选择排序没有优化
export function selectionSort(numbers: number[]): number[] {
  const arr = numbers; // 问题11: 只是引用赋值，不是拷贝
  
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    
    // 问题12: 内层循环可以从i+1开始优化
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // 问题13: 即使minIndex === i也会执行交换
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  
  return arr;
}

// 问题14: 归并排序实现有内存泄漏风险
export function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // 问题15: 没有尾递归优化
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // 问题16: 复杂的条件判断，可读性差
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // 问题17: 使用concat会创建新数组，效率低
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// 问题18: 没有导出的辅助函数，但可能被误用
function swap(arr: any[], i: number, j: number) {
  // 问题19: 没有边界检查
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 问题20: 插入排序有性能问题
export function insertionSort(arr: number[]): number[] {
  // 问题21: 直接修改原数组
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // 问题22: 使用while循环，但没有防止无限循环的保护
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
}

// 问题23: 函数接受字符串数组但没有正确的比较逻辑
export function sortStrings(arr: string[]): string[] {
  // 问题24: 使用数字比较逻辑处理字符串
  return bubbleSort(arr as any) as string[];
}

// 问题25: 没有处理特殊值的排序
export function sortWithSpecialValues(arr: (number | null | undefined)[]): number[] {
  // 问题26: 类型转换不安全，会丢失null和undefined
  return quickSort(arr.filter(x => x !== null && x !== undefined) as number[]);
}
