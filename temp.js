/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
	// let count =0;
	// let startIndex =0
	// for(let i=0;i<nums.length;i++){

	//     if(target === nums[i]){
	//         if(count=== 0) startIndex=i
	//         count++;
	//     }
	// }
	//  if(count ===0) return [-1,-1]
	//  else return [startIndex,startIndex+count-1]
	if (nums.length === 0) return [-1, -1];
	else return recursive(nums, target, 0, nums.length - 1);

	function recursive(nums, target, left, right) {
		let mid = Math.floor((left + right) / 2);
		console.log(`mid: ${mid} ,left:${left},right:${right}`);

		if (target === nums[mid]) {
			console.log(`target found `);
			let min = mid,
				max = mid;
			for (let i = mid - 1; i >= 0; i--) {
				if (nums[i] === target) min--;
				else break;
			}
			for (let i = mid + 1; i <= nums.length - 1; i++) {
				if (nums[i] === target) max++;
				else break;
			}
			console.log(`min:${min},max:${max}`);
			let arr = [];
			arr.push(min);
			arr.push(max);
			return arr;
		} else if (nums[mid] > target) {
			console.log(`passing Left Array`);
			if (left === right || right < 0) {
				console.log("returning -1");
				return [-1, -1];
			} else return recursive(nums, target, left, mid - 1);
		} else if (nums[mid] < target) {
			console.log(`passing Right Array`);
			if (left === right || left > nums.length - 1) {
				console.log("returning -1");
				return [-1, -1];
			} else return recursive(nums, target, mid + 1, right);
		}
	}
};
