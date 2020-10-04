#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
thorn <- function(
  shader,
  width = NULL, height = NULL,
  elementId = NULL
) {

  # forward options using x
  x = list(
    shader = match.arg(shader, c(
      "thorn",
      "thorn-color",
      "ikeda",
      "biomorph1",
      "biomorph2",
      "biomorph3",
      "sweet"
    ))
  )

  # create widget
  htmlwidgets::createWidget(
    name = "thorn",
    x,
    width = width,
    height = height,
    package = "thorn",
    elementId = elementId
  )
}

#' Shiny bindings for thorn
#'
#' Output and render functions for using thorn within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a thorn
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name thorn-shiny
#'
#' @export
thornOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'thorn', width, height, package = 'thorn')
}

#' @rdname thorn-shiny
#' @export
renderThorn <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, thornOutput, env, quoted = TRUE)
}
