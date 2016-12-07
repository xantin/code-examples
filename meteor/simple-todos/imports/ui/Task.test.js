import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { shallow } from 'enzyme';
import Task from './Task.jsx';

describe('TodoItem', () => {
    it('should render', () => {
                const task = { username: 'david', checked: true, text: "new david task", private: true };
                const showPrivateButton=true;
                const item = shallow(<Task task={task} showPrivateButton={showPrivateButton}/>);
                chai.assert.isTrue(item.hasClass('checked'));
                chai.assert.isTrue(item.contains('david'));
                chai.assert.isTrue(item.contains('new david task'));
    });
});