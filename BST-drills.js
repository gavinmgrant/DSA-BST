'use strict';

// 3. Create a BST class
// write a BinarySearchTree class with its core functions (insert(), remove(), find()) from scratch.
// Create a binary search tree called BST and insert 3,1,4,6,9,2,5,7 into your tree. Compare your result with the result from the 1st exercise.
// Create a binary search tree called BST and insert E A S Y Q U E S T I O N into your tree. Compare your result with the result from the 1st exercise.

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree
        if (this.key === null) {
            this.key = key;
            this.value = value;
        }
        else if (key < this.key) {
            // If the existing node does not have a left child, meaning that if the `left` pointer is empty, 
            // then we can just instantiate and insert the new node as the left child of that node, passing `this` as the parent
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            // If the node has an existing left child, then we recursively call the `insert` method 
            // so the node is added further down the tree
            else {
                this.left.insert(key, value);
            }
        }
        // Similarly, if the new key is greater than the node's key then you do the same thing, but on the right-hand side
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            // If the node only has a left child, then you replace the node with its left child
            else if (this.left) {
                this._replaceWith(this.left);
            }
            // And similarly if the node only has a right child then you replace it with its right child
            else if (this.right) {
                this._replaceWith(this.right);
            }
            // If the node has no children then simply remove it and any references to it by calling "this._replaceWith(null)"
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        // If the item you are looking for is less than the root then follow the left child.
        // If there is an existing left child, then recursively check its left and/or right child until you find the item
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        // If the item you are looking for is greater than the root then follow the right child.
        // If there is an existing right child, then recursively check its left and/or right child until you find the item
        else if (key < this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }
            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

    _findMax() {
        if (!this.right) {
            return this;
        }
        return this.right._findMax();
    }
}

const BST = new BinarySearchTree();

const drill3a = bst => {
    bst.insert(3);
    bst.insert(1);
    bst.insert(4);
    bst.insert(6);
    bst.insert(9);
    bst.insert(2);
    bst.insert(5);
    bst.insert(7);

    return bst;
}

drill3a(BST)
// console.log(drill3a(BST));

const drill3b = bst => {
    bst.insert('E', 1);
    bst.insert('A', 1);
    bst.insert('S', 1);
    bst.insert('Y', 1);
    bst.insert('Q', 1);
    bst.insert('U', 1);
    bst.insert('E', 1);
    bst.insert('S', 1);
    bst.insert('T', 1);
    bst.insert('I', 1);
    bst.insert('O', 1);
    bst.insert('N', 1);

    return bst;
}

// console.log(drill3b(BST));

// 4. What does this program do?
// Without running this code in your code editor, explain what the following program does. 
// Show with an example the result of executing this program. 
// What is the runtime of this algorithm?

function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}

// console.log(tree(BST))

// Answer: It totals the values of all the nodes in a binary search tree. For example, the BST above with nodes that each have a value of 1 returns 12.
// The runtime of this algorithm is O(n^2). 

// 5. Height of a BST
// Write an algorithm to find the height of a binary search tree. What is the time complexity of your algorithm?

const heightFinder = bst => {
    if (!bst) {
        return 0;
    }
    if (bst) {
        let leftSide = heightFinder(bst.left);
        let rightSide = heightFinder(bst.right);
        let height = Math.max(leftSide, rightSide) + 1;
        return height
    }
}

// console.log(heightFinder(BST));

// Answer: The runtime of this algorithm is O(n^2).

// 6. Is it a BST?
// Write an algorithm to check whether an arbitrary binary tree is a binary search tree, assuming the tree does not contain duplicates.

const checkBST = tree => {
    if (!tree) {
        return false;
    }
  
    // if there is a right side, validate
    if (tree.right) {
        if (tree.right.key > tree.key) {
            // recursive function to continue traversing the tree if right is greater than current key
            checkBST(tree.right);
        } else {
            // if right less than, it's not a binary search tree
            return false;
        }
    }
  
    // if there is a left side, validate
    if (tree.left) {
        if (tree.left.key < tree.key) {
            // recursive function to continue traversing the tree if left is less than current key
            checkBST(tree.left);
        } else {
            // if left greater than, it's not a binary search tree
            return false;
        }
    }
  
    return true;
  }

// console.log(checkBST(BST));

// 7. 3rd largest node
// Write an algorithm to find the 3rd largest node in a binary search tree.

const kthLargest = (root, k) => {
    let sortedArr = [];

    // use recursion to traverse the tree and push keys into the sortedArr array
    const dfs = node => {
        // if the node is null, you have gone too far
        if (!node) return;
        // recursive call to check the node to the right of the current node
        dfs(node.right);
        // add the node keys as you go from largest to smallest key
        sortedArr.push(node.key);
        // now that the right nodes have been checked, traverse the left side
        dfs(node.left);
    }
    // call the depth first search function
    dfs(root);

    return sortedArr[k-1];
}

console.log(kthLargest(BST, 3));