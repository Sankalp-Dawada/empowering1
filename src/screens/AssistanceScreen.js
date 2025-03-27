import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AssistanceScreen = () => {
  const disabilityCategories = [
    { id: 1, name: 'Visual Impairment', icon: 'eye' },
    { id: 2, name: 'Hearing Impairment', icon: 'assistive-listening-systems' },
    { id: 3, name: 'Mobility Challenges', icon: 'wheelchair' },
    { id: 4, name: 'Cognitive Disabilities', icon: 'brain' },
    { id: 5, name: 'Speech Impairments', icon: 'microphone-slash' }
  ];

  const [learningContent, setLearningContent] = useState([
    {
      id: 1,
      title: 'Digital Accessibility Skills',
      category: 'Visual Impairment',
      difficulty: 'Beginner',
      duration: '2h 30m',
      modules: [
        { title: 'Screen Reader Basics', completed: false },
        { title: 'Web Navigation Techniques', completed: false },
        { title: 'Keyboard Shortcuts', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Sign Language Communication',
      category: 'Hearing Impairment',
      difficulty: 'Intermediate',
      duration: '3h 45m',
      modules: [
        { title: 'Basic Sign Language', completed: false },
        { title: 'Professional Communication', completed: false },
        { title: 'Digital Sign Language Tools', completed: false }
      ]
    }
  ]);

  const [userProfile, setUserProfile] = useState({
    name: 'Alex Martinez',
    primaryDisability: 'Visual Impairment',
    completedCourses: 0,
    totalLearningHours: 0
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredContent = selectedCategory
    ? learningContent.filter(content => content.category === selectedCategory)
    : learningContent;

  const completeModule = (courseId, moduleIndex) => {
    const updatedContent = learningContent.map(course => {
      if (course.id === courseId) {
        const updatedModules = [...course.modules];
        updatedModules[moduleIndex].completed = true;
        return { ...course, modules: updatedModules };
      }
      return course;
    });

    setLearningContent(updatedContent);
    setUserProfile(prev => ({
      ...prev,
      completedCourses: prev.completedCourses + 1,
      totalLearningHours: prev.totalLearningHours + 0.5
    }));
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f7f7f7', padding: 16 }}>
      <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 10, marginBottom: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Welcome, {userProfile.name}</Text>
        <Text style={{ color: 'gray' }}>Primary Disability: {userProfile.primaryDisability}</Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={{ marginRight: 20 }}>{userProfile.completedCourses} Courses</Text>
          <Text>{userProfile.totalLearningHours}h Learning</Text>
        </View>
      </View>

      <ScrollView horizontal style={{ marginBottom: 16 }}>
        {disabilityCategories.map(category => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
            style={{
              padding: 10,
              marginRight: 10,
              borderRadius: 8,
              backgroundColor: selectedCategory === category.name ? '#007BFF' : 'white'
            }}
          >
            <FontAwesome name={category.icon} size={20} color={selectedCategory === category.name ? 'white' : 'black'} />
            <Text style={{ color: selectedCategory === category.name ? 'white' : 'black' }}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredContent.map(course => (
        <View key={course.id} style={{ backgroundColor: 'white', padding: 16, borderRadius: 10, marginBottom: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{course.title}</Text>
          <Text style={{ color: 'gray' }}>{course.difficulty} | {course.duration}</Text>
          {course.modules.map((module, index) => (
            <View key={module.title} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <Text>{module.title}</Text>
              {!module.completed && (
                <TouchableOpacity onPress={() => completeModule(course.id, index)}>
                  <Text style={{ color: '#007BFF' }}>Mark Complete</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default AssistanceScreen;
