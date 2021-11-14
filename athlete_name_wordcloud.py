import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud

# Load data as pandas dataframe
df = pd.read_csv("athlete_events.csv")

# Create dictionaries out of the dataframe
records = df.to_dict(orient='records')
data = records[1]
#data = {x['Emoji']: x['CNT'] for x in records}
#colors = {x['Emoji']: x['Common'] for x in records}

# Generate word cloud from frequencies
wc = WordCloud(background_color="white", max_words=1000)
wc.generate_from_frequencies(data)
'''
# Color words depending on the colors dictionary
def color_func(word, **kwargs):
    if colors.get(word) == 'yes':
        return "rgb(0, 255, 0)"
    else:
        return "rgb(255, 0, 0)"
'''
#wc.recolor(color_func=color_func)

# Show final result
plt.imshow(wc, interpolation="bilinear")
plt.axis("off")
plt.show()



'''
import csv
import pandas as pd
from wordcloud import WordCloud


#read first column of csv file to string of words seperated
#by tab

your_list = []
with open('athlete_events.csv', 'rb') as f:
    reader = csv.reader(f)
    your_list = '\t'.join([i[1] for i in reader])

your_list = []
df = pd.read_csv("athlete_events.csv")
data1 = df["Name"].astype('|S80')
your_list = data1.values.tolist()


# Generate a word cloud image
wordcloud = WordCloud().generate(your_list)

# Display the generated image:
# the matplotlib way:
import matplotlib.pyplot as plt
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis("off")

# lower max_font_size
wordcloud = WordCloud(max_font_size=40).generate(your_list)
plt.figure()
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.show()

# The pil way (if you don't have matplotlib)
# image = wordcloud.to_image()
# image.show()
'''
