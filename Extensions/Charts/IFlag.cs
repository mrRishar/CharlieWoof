namespace Charts
{
    public interface IFlag<T>
    {
        /// <summary>
        /// Title of Flag (A, Buy, Sell)
        /// </summary>
        string Title { get; set; }

        /// <summary>
        /// text on hover the flag
        /// </summary>
        string Text { get; set; }

        /// <summary>
        /// values of the flag. for example datetime dot on XAxix
        /// </summary>
        T Value { get; set; }

        string Draw();
    }
}
