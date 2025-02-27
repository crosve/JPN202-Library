import { useState } from "react";

interface VerbExample {
  dictionary: string;
  meaning: string;
  presentPositive: string;
  presentNegative: string;
  pastPositive: string;
  pastNegative: string;
  teForm: string;
}
interface VerbGroup {
  name: string;
  description: string;
  examples: VerbExample[];
}

interface VerbGroups {
  [key: string]: VerbGroup;
}

// Define the Grammar component

const Grammar = () => {
  const [activeTab, setActiveTab] = useState("group1");
  const [showExplanation, setShowExplanation] = useState(true);

  // Define verb groups and example verbs
  const verbGroups: VerbGroups = {
    group1: {
      name: "Group 1 (Godan/U-verbs)",
      description: "Verbs ending in う, く, ぐ, す, つ, ぬ, ぶ, む, る",
      examples: [
        {
          dictionary: "話す (はなす)",
          meaning: "to speak",
          presentPositive: "話す (はなす)",
          presentNegative: "話さない (はなさない)",
          pastPositive: "話した (はなした)",
          pastNegative: "話さなかった (はなさなかった)",
          teForm: "話して (はなして)",
        },
        {
          dictionary: "買う (かう)",
          meaning: "to buy",
          presentPositive: "買う (かう)",
          presentNegative: "買わない (かわない)",
          pastPositive: "買った (かった)",
          pastNegative: "買わなかった (かわなかった)",
          teForm: "買って (かって)",
        },
        {
          dictionary: "待つ (まつ)",
          meaning: "to wait",
          presentPositive: "待つ (まつ)",
          presentNegative: "待たない (またない)",
          pastPositive: "待った (まった)",
          pastNegative: "待たなかった (またなかった)",
          teForm: "待って (まって)",
        },
      ],
    },
    group2: {
      name: "Group 2 (Ichidan/Ru-verbs)",
      description: "Verbs ending in いる or える",
      examples: [
        {
          dictionary: "食べる (たべる)",
          meaning: "to eat",
          presentPositive: "食べる (たべる)",
          presentNegative: "食べない (たべない)",
          pastPositive: "食べた (たべた)",
          pastNegative: "食べなかった (たべなかった)",
          teForm: "食べて (たべて)",
        },
        {
          dictionary: "見る (みる)",
          meaning: "to see",
          presentPositive: "見る (みる)",
          presentNegative: "見ない (みない)",
          pastPositive: "見た (みた)",
          pastNegative: "見なかった (みなかった)",
          teForm: "見て (みて)",
        },
        {
          dictionary: "起きる (おきる)",
          meaning: "to wake up",
          presentPositive: "起きる (おきる)",
          presentNegative: "起きない (おきない)",
          pastPositive: "起きた (おきた)",
          pastNegative: "起きなかった (おきなかった)",
          teForm: "起きて (おきて)",
        },
      ],
    },
    irregular: {
      name: "Irregular Verbs",
      description: "Special verbs with unique conjugation patterns",
      examples: [
        {
          dictionary: "する",
          meaning: "to do",
          presentPositive: "する",
          presentNegative: "しない",
          pastPositive: "した",
          pastNegative: "しなかった",
          teForm: "して",
        },
        {
          dictionary: "来る (くる)",
          meaning: "to come",
          presentPositive: "来る (くる)",
          presentNegative: "来ない (こない)",
          pastPositive: "来た (きた)",
          pastNegative: "来なかった (こなかった)",
          teForm: "来て (きて)",
        },
      ],
    },
  };

  return (
    <div className="bg-amber-50 w-full">
      <div className="max-w-4xl mx-auto  rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-green-300 text-gray-800 p-4">
          <h2 className="text-2xl font-bold">
            Japanese Verb Conjugation Guide
          </h2>
          <p className="text-blue-700">
            Short form conjugations and te-form explanations
          </p>
        </div>

        {/* Explanation Toggle */}
        <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-blue-800">
            Understanding Verb Forms
          </h3>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-sm"
          >
            {showExplanation ? "Hide Explanation" : "Show Explanation"}
          </button>
        </div>

        {/* Explanation Section */}
        {showExplanation && (
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Short Form and Te-Form Correlation:</strong>
              </p>
              <p>
                In Japanese, the short form (普通形・ふつうけい) and te-form
                (てけい) are closely related, both derived from the verb stem:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  The <strong>short form</strong> is used in casual speech,
                  subordinate clauses, and to create other grammatical forms.
                </li>
                <li>
                  The <strong>te-form</strong> is derived from the short form
                  past tense, by replacing た with て.
                </li>
                <li>
                  For Group 1 verbs (Godan), the final sound changes follow the
                  same pattern in both past tense and te-form:
                </li>
              </ul>

              <div className="grid grid-cols-2 gap-4 mt-3 bg-white p-3 rounded border border-blue-100">
                <div>
                  <p className="font-medium text-blue-800">
                    Group 1 (Godan) Pattern:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>う、つ、る → って (買う→買って)</li>
                    <li>む、ぶ、ぬ → んで (読む→読んで)</li>
                    <li>く → いて (書く→書いて)</li>
                    <li>ぐ → いで (泳ぐ→泳いで)</li>
                    <li>す → して (話す→話して)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-blue-800">
                    Group 2 (Ichidan) Pattern:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Remove る and add て (食べる→食べて)</li>
                  </ul>
                  <p className="font-medium text-blue-800 mt-2">
                    Irregular Verbs:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>する → して</li>
                    <li>来る → 来て (きて)</li>
                  </ul>
                </div>
              </div>

              <p className="mt-2">
                <strong>Key Relationship:</strong> Once you learn how to form
                the past tense, you can easily create the te-form by applying
                similar sound changes.
              </p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-gray-100 border-b border-gray-200">
          <nav className="flex">
            {Object.keys(verbGroups).map((groupKey) => (
              <button
                key={groupKey}
                className={`px-4 py-2 font-medium ${
                  activeTab === groupKey
                    ? "bg-white text-blue-700 border-t-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(groupKey)}
              >
                {verbGroups[groupKey].name}
              </button>
            ))}
          </nav>
        </div>

        {/* Verb Tables */}
        <div className="p-4">
          <div className="mb-3">
            <h4 className="text-lg font-medium text-gray-800">
              {verbGroups[activeTab].name}
            </h4>
            <p className="text-sm text-gray-600">
              {verbGroups[activeTab].description}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dictionary Form
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Present (+)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Present (-)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Past (+)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Past (-)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50">
                    Te-Form
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {verbGroups[activeTab].examples.map((verb, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {verb.dictionary}
                      </div>
                      <div className="text-sm text-gray-500">
                        {verb.meaning}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {verb.presentPositive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {verb.presentNegative}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {verb.pastPositive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {verb.pastNegative}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-blue-50">
                      {verb.teForm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded p-3 text-sm text-yellow-800">
            <p className="font-medium">Study Tip:</p>
            <p>
              Notice how the te-form pattern follows the same sound changes as
              the past tense form. If you know how to form the past tense, you
              can easily derive the te-form!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grammar;
