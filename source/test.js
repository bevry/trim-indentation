'use strict'

const joe = require('joe')
const { equal, errorEqual } = require('assert-helpers')
const trimIndentation = require('./')

const successCases = [
	{
		name: '0, 0',
		args: ['a\nb'],
		output: 'a\nb'
	},
	{
		name: '0, 0, 0',
		args: ['a\nb\n'],
		output: 'a\nb'
	},
	{
		name: 'tabs: 1, 2, 1',
		args: ['\ta\n\t\tb\n\tc'],
		output: 'a\n\tb\nc'
	},
	{
		name: 'spaces: 2, 4, 2',
		args: ['  a\n    b\n  c'],
		output: 'a\n  b\nc'
	},
	{
		name: 'uneven: 2s, 3s',
		args: ['  a\n   b'],
		output: 'a\n b'
	},
	{
		name: 'uneven: 2t, 3t',
		args: ['\t\ta\n\t\t\tb'],
		output: 'a\n\tb'
	}
]

const failureCases = [
	{
		name: 'mixed: 2t, 4s',
		args: ['    a\n\t\tb'],
		output: 'inconsitent indentation for trimming'
	},
	{
		name: 'spaces: 4, 2, 4',
		args: ['    a\n  b\n    c'],
		output: 'inconsitent indentation for trimming'
	},
	{
		name: 'tabs: 2, 1, 2',
		args: ['\t\ta\n\tb\n\t\tc'],
		output: 'inconsitent indentation for trimming'
	},
	{
		name: 'mixed: 4s, 2t',
		args: ['    a\n\t\tb'],
		output: 'inconsitent indentation for trimming'
	}
]

joe.suite('trim-indentation', function (suite) {
	suite('success cases', function (suite, test) {
		successCases.forEach(function ({ name, args, output }) {
			test(name, function () {
				equal(
					trimIndentation(...args),
					output,
					name
				)
			})
		})
	})

	suite('failure cases', function (suite, test) {
		failureCases.forEach(function ({ name, args, output }) {
			test(name, function () {
				try {
					trimIndentation(...args)
					throw new Error('test should have failed but it did not')
				}
				catch (error) {
					errorEqual(
						error,
						output,
						name
					)
				}
			})
		})
	})

})
